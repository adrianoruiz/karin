/**
 * Utilitários para manipulação de datas
 */

// Importa o logger
const Logger = require('./logger');
const logger = new Logger(process.env.NODE_ENV !== 'production');

/**
 * Classe para manipulação de datas
 */
class DateUtils {
  /**
   * Converte uma data em linguagem natural para o formato YYYY-MM-DD
   * @param {string} dateText - Data em linguagem natural (hoje, amanhã) ou no formato DD/MM/YYYY
   * @returns {string|null} - Data no formato YYYY-MM-DD ou null se inválida
   */
  static parseDate(dateText) {
    if (!dateText || typeof dateText !== 'string') {
      return null;
    }
    
    logger.log(`Processando entrada de data: "${dateText}"`);
    
    // Normaliza o texto removendo acentos e convertendo para minúsculas
    const normalizedText = dateText
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
    
    logger.log(`Texto normalizado: "${normalizedText}"`);
    
    const today = new Date();
    
    // Mapeamento de termos para datas relativas
    const dateTerms = {
      hoje: 0,
      hj: 0,
      amanha: 1,
      amanhã: 1
    };
    
    // Verifica termos exatos como "hoje" ou "amanhã"
    if (normalizedText in dateTerms) {
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + dateTerms[normalizedText]);
      const formattedDate = targetDate.toISOString().split('T')[0];
      logger.log(`Identificado como termo específico: ${formattedDate}`);
      return formattedDate;
    }
    
    // Verifica se contém "amanhã" em qualquer parte
    if (normalizedText.includes('amanha')) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0];
      logger.log(`Texto contém "amanhã": ${formattedDate}`);
      return formattedDate;
    }
    
    // Mapeamento de dias da semana (0 = domingo, 1 = segunda, etc.)
    const weekDays = {
      domingo: 0,
      segunda: 1,
      'segunda-feira': 1,
      'segunda feira': 1,
      terca: 2,
      terça: 2,
      'terca-feira': 2,
      'terça-feira': 2,
      'terca feira': 2,
      'terça feira': 2,
      quarta: 3,
      'quarta-feira': 3,
      'quarta feira': 3,
      quinta: 4,
      'quinta-feira': 4,
      'quinta feira': 4,
      sexta: 5,
      'sexta-feira': 5,
      'sexta feira': 5,
      sabado: 6,
      sábado: 6
    };
    
    // Verificar dias da semana de forma mais precisa
    for (const [dayName, dayNumber] of Object.entries(weekDays)) {
      // Verificar se o texto contém o dia da semana como palavra completa
      const regex = new RegExp(`\\b${dayName}\\b`, 'i');
      if (regex.test(normalizedText)) {
        // Calcula a próxima ocorrência desse dia da semana
        const nextDate = this.getNextDayOfWeek(today, dayNumber);
        const formattedDate = nextDate.toISOString().split('T')[0];
        logger.log(`Identificado dia da semana "${dayName}" como palavra completa: ${formattedDate}`);
        return formattedDate;
      }
    }
    
    // Verifica formato DD/MM/YYYY
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = normalizedText.match(dateRegex);
    
    if (match) {
      const [, day, month, year] = match;
      
      // Validação básica de data
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      
      if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
        logger.error(`Data inválida: ${normalizedText}`);
        return null;
      }
      
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      logger.log(`Identificado como data formatada: ${formattedDate}`);
      
      // Verificação adicional da validade da data
      const dateObj = new Date(formattedDate);
      if (isNaN(dateObj.getTime())) {
        logger.error(`Data inválida após conversão: ${formattedDate}`);
        return null;
      }
      
      return formattedDate;
    }
    
    logger.log(`Não foi possível interpretar a data: "${dateText}"`);
    return null;
  }
  
  /**
   * Calcula a próxima ocorrência de um determinado dia da semana
   * @param {Date} fromDate - Data de referência
   * @param {number} dayOfWeek - Dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
   * @returns {Date} - Data da próxima ocorrência do dia da semana
   */
  static getNextDayOfWeek(fromDate, dayOfWeek) {
    const date = new Date(fromDate);
    const currentDay = date.getDay();
    
    // Calcula quantos dias adicionar
    let daysToAdd = dayOfWeek - currentDay;
    
    // Se o dia da semana já passou esta semana, vai para a próxima
    if (daysToAdd <= 0) {
      daysToAdd += 7;
    }
    
    // Adiciona os dias calculados
    date.setDate(date.getDate() + daysToAdd);
    
    return date;
  }
  
  /**
   * Formata uma data para exibição ao usuário
   * @param {string} isoDate - Data no formato YYYY-MM-DD
   * @returns {string} - Data formatada como DD/MM/YYYY
   */
  static formatDateForDisplay(isoDate) {
    if (!isoDate) return '';
    
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  }
  
  /**
   * Obtém o nome do dia da semana para uma data
   * @param {string|Date} date - Data para obter o nome do dia
   * @returns {string} - Nome do dia da semana em português
   */
  static getDayOfWeekName(date) {
    // Se a data for uma string no formato YYYY-MM-DD
    let dateObj;
    if (typeof date === 'string') {
      // Certifique-se de criar a data no fuso horário local
      const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
      dateObj = new Date(year, month - 1, day); // Mês em JS é 0-indexed
    } else {
      dateObj = new Date(date);
    }
    
    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) {
      logger.error(`Data inválida para obter nome do dia da semana: ${date}`);
      return '';
    }
    
    const weekDays = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];
    
    // Certifique-se de que estamos usando o dia correto
    const dayOfWeek = dateObj.getDay();
    logger.log(`Data: ${dateObj.toISOString().split('T')[0]}, Dia da semana: ${dayOfWeek} (${weekDays[dayOfWeek]})`);
    
    return weekDays[dayOfWeek];
  }
  
  /**
   * Obtém a data de hoje no formato YYYY-MM-DD
   * @returns {string} - Data de hoje
   */
  static getToday() {
    return new Date().toISOString().split('T')[0];
  }
  
  /**
   * Obtém a data de amanhã no formato YYYY-MM-DD
   * @returns {string} - Data de amanhã
   */
  static getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  
  /**
   * Adiciona um número de dias a uma data
   * @param {string|Date} date - Data base
   * @param {number} days - Número de dias a adicionar
   * @returns {string} - Nova data no formato YYYY-MM-DD
   */
  static addDays(date, days) {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.toISOString().split('T')[0];
  }
}

module.exports = DateUtils;
