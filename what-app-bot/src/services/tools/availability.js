/**
 * Ferramentas relacionadas à disponibilidade de horários
 */
const axios = require('axios');
const config = require('../../../config');
const { DateUtils, Logger } = require('../../utils/index');
const logger = new Logger(process.env.NODE_ENV !== 'production');

/**
 * Classe para gerenciar a API de disponibilidade
 */
class AvailabilityService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  
  /**
   * Consulta os horários disponíveis para agendamento na API
   * @param {Object} options - Opções para a consulta
   * @param {string} options.date - Data para verificar disponibilidade (formato: string que possa ser interpretada)
   * @param {number} options.doctorId - ID do médico (padrão: 2)
   * @param {boolean} options.extendedSearch - Se deve buscar próximas 2 semanas (padrão: false - só semana atual)
   * @returns {Promise<Array>} - Lista de horários disponíveis
   * @throws {Error} - Erro durante a consulta à API
   */
  async getAvailableAppointments({ date = null, doctorId = 2, extendedSearch = false } = {}) {
    try {
      // Valida o ID do médico
      if (doctorId !== null && (!Number.isInteger(doctorId) || doctorId <= 0)) {
        throw new Error(`ID do médico inválido: ${doctorId}`);
      }
      
      // Se uma data específica foi fornecida, busca apenas para essa data
      if (date) {
        const parsedDate = DateUtils.parseDate(date);
        if (!parsedDate) {
          throw new Error(`Data inválida: ${date}`);
        }
        
        logger.log(`Consultando horários disponíveis para a data específica: ${parsedDate}`);
        
        const response = await axios.get(`${this.apiUrl}availabilities`, {
          params: {
            doctor_id: doctorId,
            date: parsedDate
          },
          timeout: 5000
        });
        
        if (!response.data || !response.data.availabilities) {
          return [];
        }
        
        return this._processAvailabilities(response.data.availabilities, parsedDate);
      }
      
      // Se não foi fornecida data específica, busca para a semana atual
      // ou próximas 2 semanas se extendedSearch for true
      const daysToSearch = extendedSearch ? 14 : 7; // 2 semanas ou 1 semana
      
      logger.log(`Buscando horários disponíveis para os próximos ${daysToSearch} dias (extendedSearch: ${extendedSearch})`);
      
      return await this._findAvailableDatesInRange(doctorId, daysToSearch);
      
    } catch (error) {
      // Tratamento de erros específicos
      if (error.response) {
        logger.error(`Erro na resposta da API (${error.response.status}):`, error.response.data);
        throw new Error(`Erro ao consultar disponibilidade: ${error.response.status}`);
      } else if (error.request) {
        logger.error('Erro na requisição (sem resposta):', error.request);
        throw new Error('Não foi possível conectar ao servidor de agendamentos');
      } else {
        logger.error('Erro ao consultar horários disponíveis:', error);
        throw new Error(`Erro ao buscar horários: ${error.message}`);
      }
    }
  }
  
  /**
   * Processa as disponibilidades retornadas pela API
   * @private
   * @param {Array} availabilities - Lista de disponibilidades da API
   * @param {string|null} filterDate - Data para filtrar (formato YYYY-MM-DD)
   * @returns {Array} - Lista de horários disponíveis processados
   */
  _processAvailabilities(availabilities, filterDate) {
    if (!Array.isArray(availabilities)) {
      logger.error('Disponibilidades não é um array', availabilities);
      return [];
    }
    
    // Filtra apenas os horários com status "available"
    let availableTimes = availabilities
      .filter(slot => slot && slot.status === "available")
      .map(slot => ({
        date: slot.date?.split('T')[0] || '',
        time: slot.time || '',
        formattedDate: DateUtils.formatDateForDisplay(slot.date?.split('T')[0] || ''),
        dayOfWeek: DateUtils.getDayOfWeekName(slot.date?.split('T')[0] || '')
      }))
      .filter(slot => slot.date && slot.time); // Remove slots sem data ou hora
    
    // Se uma data específica foi fornecida, filtra apenas os horários dessa data
    if (filterDate) {
      availableTimes = availableTimes.filter(slot => slot.date === filterDate);
      logger.log(`Horários disponíveis filtrados para a data ${filterDate}:`, availableTimes);
    } else {
      logger.log(`Horários disponíveis encontrados (sem filtro de data):`, availableTimes);
    }
    
    return availableTimes;
  }
  
  /**
   * Busca horários disponíveis em um range de dias específico
   * @private
   * @param {number} doctorId - ID do médico
   * @param {number} daysToCheck - Número de dias a verificar (7 para semana atual, 14 para próximas 2 semanas)
   * @returns {Promise<Array>} - Lista de horários disponíveis
   */
  async _findAvailableDatesInRange(doctorId, daysToCheck = 7) {
    let allAvailableTimes = [];
    
    // Tenta buscar todas as disponibilidades de uma vez (sem filtro de data)
    try {
      logger.log(`Buscando todas as disponibilidades para filtragem local`);
      
      const response = await axios.get(`${this.apiUrl}availabilities`, {
        params: {
          doctor_id: doctorId
          // Sem parâmetro date para pegar todas as disponibilidades
        },
        timeout: 8000 // Timeout maior para busca completa
      });
      
      if (response.data && response.data.availabilities) {
        // Processa todas as disponibilidades sem filtro de data
        const allTimes = this._processAvailabilities(response.data.availabilities, null);
        
        logger.log(`Total de horários encontrados na API: ${allTimes.length}`);
        
        if (daysToCheck === 7) {
          // Para semana atual: pega os primeiros horários disponíveis (máximo 20)
          allAvailableTimes = allTimes.slice(0, 20);
          logger.log(`Mostrando primeiros ${allAvailableTimes.length} horários disponíveis (semana atual)`);
        } else {
          // Para busca estendida: pega mais horários (máximo 40)
          allAvailableTimes = allTimes.slice(0, 40);
          logger.log(`Mostrando primeiros ${allAvailableTimes.length} horários disponíveis (busca estendida)`);
        }
        
        if (allAvailableTimes.length > 0) {
          return allAvailableTimes;
        }
      }
    } catch (error) {
      logger.error(`Erro na busca geral de disponibilidades:`, error);
    }
    
    // Fallback: busca individual por dia
    logger.log(`Fazendo fallback para busca individual por dia`);
    return await this._findNextAvailableDates(doctorId, daysToCheck * 4); // Busca mais dias no fallback
  }

  /**
   * Busca horários disponíveis para os próximos dias (método de fallback)
   * @private
   * @param {number} doctorId - ID do médico
   * @param {number} daysToCheck - Número de dias a verificar
   * @returns {Promise<Array>} - Lista de horários disponíveis
   */
  async _findNextAvailableDates(doctorId, daysToCheck = 7) {
    const today = new Date();
    let allAvailableTimes = [];
    let foundCount = 0;
    const maxResults = daysToCheck <= 7 ? 20 : 40; // Limita resultados
    
    // Verifica cada dia, um por um (método original como fallback)
    // Busca em um range maior para encontrar disponibilidades futuras
    for (let i = 0; i < 60 && foundCount < maxResults; i++) { // Busca até 60 dias no futuro
      const nextDate = DateUtils.addDays(today, i);
      
      try {
        logger.log(`Verificando disponibilidade para o dia ${nextDate}`);
        
        const response = await axios.get(`${this.apiUrl}availabilities`, {
          params: {
            doctor_id: doctorId,
            date: nextDate
          },
          timeout: 5000
        });
        
        if (response.data && response.data.availabilities) {
          const availableTimes = this._processAvailabilities(response.data.availabilities, nextDate);
          
          if (availableTimes.length > 0) {
            logger.log(`Encontrados ${availableTimes.length} horários para ${nextDate}`);
            allAvailableTimes = allAvailableTimes.concat(availableTimes);
            foundCount += availableTimes.length;
            
            // Para semana atual, para depois de encontrar horários suficientes
            if (daysToCheck <= 7 && foundCount >= 10) {
              break;
            }
          }
        }
      } catch (error) {
        logger.error(`Erro ao verificar disponibilidade para ${nextDate}:`, error);
        // Continua verificando os próximos dias mesmo em caso de erro
      }
    }
    
    return allAvailableTimes;
  }
  
  /**
   * Agrupa horários por data
   * @private
   * @param {Array} availableTimes - Lista de horários disponíveis
   * @returns {Object} - Horários agrupados por data
   */
  _groupByDate(availableTimes) {
    const grouped = {};
    
    availableTimes.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    
    return grouped;
  }
}

// Cria uma instância do serviço de disponibilidade
const availabilityService = new AvailabilityService(config.apiUrl);

/**
 * Definição da função de disponibilidade para o GPT
 */
const availabilityFunction = {
  name: "getAvailableAppointments",
  description: "Consulta os horários disponíveis para agendamento na API",
  parameters: {
    type: "object",
    properties: {
      date: {
        type: "string",
        description: "Data no formato DD/MM/YYYY ou em linguagem natural (hoje, amanhã, segunda, terça, etc.) para verificar disponibilidade"
      },
      doctorId: {
        type: "number",
        description: "ID do médico para verificar disponibilidade (padrão: 2 - Dra. Karin)"
      },
      extendedSearch: {
        type: "boolean",
        description: "Se deve buscar próximas 2 semanas (padrão: false - só semana atual)"
      }
    },
    required: []
  }
};

/**
 * Função de compatibilidade com a interface anterior
 * @param {string} date - Data para verificar disponibilidade
 * @param {number} doctorId - ID do médico (padrão: 2)
 * @param {boolean} extendedSearch - Se deve buscar próximas 2 semanas (padrão: false)
 * @returns {Promise<Array>} - Lista de horários disponíveis
 */
async function getAvailableAppointments(date = null, doctorId = 2, extendedSearch = false) {
  try {
    return await availabilityService.getAvailableAppointments({ date, doctorId, extendedSearch });
  } catch (error) {
    logger.error('Erro ao obter horários disponíveis:', error);
    return [];
  }
}

// Exporta as funções e classes
module.exports = {
  availabilityFunction,
  getAvailableAppointments,
  parseDateInput: DateUtils.parseDate, // Para compatibilidade com código existente
  AvailabilityService,
  availabilityService
};