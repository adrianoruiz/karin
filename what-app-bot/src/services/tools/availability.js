/**
 * Ferramentas relacionadas à disponibilidade de horários
 */
const axios = require('axios');
const config = require('../../../config');
const DateUtils = require('../../utils/dateUtils');
const Logger = require('../../utils/logger');

// Instância global do logger - pode ser configurada baseada no ambiente
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
   * @returns {Promise<Array>} - Lista de horários disponíveis
   * @throws {Error} - Erro durante a consulta à API
   */
  async getAvailableAppointments({ date = null, doctorId = 2 } = {}) {
    try {
      // Valida o ID do médico
      if (doctorId !== null && (!Number.isInteger(doctorId) || doctorId <= 0)) {
        throw new Error(`ID do médico inválido: ${doctorId}`);
      }
      
      // Processa a entrada de data, se fornecida
      const parsedDate = date ? DateUtils.parseDate(date) : null;
      const dateToQuery = parsedDate || DateUtils.getToday(); // Se não houver data, consulta hoje
      
      logger.log(`Consultando horários disponíveis para a data: ${dateToQuery}`);
      
      // Consulta a API de disponibilidades
      const response = await axios.get(`${this.apiUrl}availabilities`, {
        params: {
          doctor_id: doctorId,
          date: dateToQuery
        },
        timeout: 5000 // Timeout de 5 segundos
      });
      
      logger.log(`Resposta da API recebida para ${dateToQuery}`, response.data);
      
      // Verificar se a resposta é válida
      if (!response.data || !response.data.availabilities) {
        logger.error('Resposta da API inválida ou vazia');
        // Mesmo com resposta inválida, tentar buscar nos próximos dias se nenhuma data específica foi pedida
        if (!parsedDate) {
            logger.log('Resposta inválida para data atual, buscando próximos dias...');
            return await this._findNextAvailableDates(doctorId);
        }
        return [];
      }
      
      // Processa e filtra as disponibilidades para a data consultada
      const availableTimes = this._processAvailabilities(response.data.availabilities, dateToQuery);
      
      // Se não houver horários disponíveis para a data solicitada (seja específica ou hoje),
      // busca horários para os próximos 10 dias
      if (availableTimes.length === 0) {
        logger.log(`Nenhum horário disponível para ${dateToQuery}, buscando para os próximos dias`);
        return await this._findNextAvailableDates(doctorId);
      }
      
      return availableTimes;
    } catch (error) {
      // Tratamento de erros específicos
      if (error.response) {
        // Erro de resposta da API (status diferente de 2xx)
        logger.error(`Erro na resposta da API (${error.response.status}):`, error.response.data);
        // Tentar buscar nos próximos dias mesmo em erro, se nenhuma data específica foi pedida
        if (!parsedDate) {
             logger.log('Erro na API para data atual, buscando próximos dias...');
            return await this._findNextAvailableDates(doctorId);
        }
        throw new Error(`Erro ao consultar disponibilidade: ${error.response.status}`);
      } else if (error.request) {
        // Erro na requisição (sem resposta)
        logger.error('Erro na requisição (sem resposta):', error.request);
        throw new Error('Não foi possível conectar ao servidor de agendamentos');
      } else {
        // Outro tipo de erro
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
   * Busca horários disponíveis para os próximos dias
   * @private
   * @param {number} doctorId - ID do médico
   * @param {number} daysToCheck - Número de dias a verificar
   * @returns {Promise<Array>} - Lista de horários disponíveis
   */
  async _findNextAvailableDates(doctorId, daysToCheck = 7) {
    const today = new Date();
    let allAvailableTimes = [];
    
    // Verifica cada dia, um por um
    for (let i = 1; i <= daysToCheck; i++) {
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
            
            // Se encontrou pelo menos 3 dias com horários disponíveis, interrompe a busca
            if (Object.keys(this._groupByDate(allAvailableTimes)).length >= 3) {
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
      }
    },
    required: []
  }
};

/**
 * Função de compatibilidade com a interface anterior
 * @param {string} date - Data para verificar disponibilidade
 * @param {number} doctorId - ID do médico (padrão: 2)
 * @returns {Promise<Array>} - Lista de horários disponíveis
 */
async function getAvailableAppointments(date = null, doctorId = 2) {
  try {
    return await availabilityService.getAvailableAppointments({ date, doctorId });
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