/**
 * Utilitários para manipulação de datas
 */

import { z } from 'zod';
import Logger from './logger';

// Cria o logger
const logger = new Logger(process.env.NODE_ENV !== 'production');

// Esquemas Zod para validação
const DateSchema = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Data deve estar no formato YYYY-MM-DD' }),
  z.date()
]);

const DateTextSchema = z.string().min(1, { message: 'Texto da data não pode ser vazio' });

const DayOfWeekSchema = z.number().min(0).max(6);

/**
 * Interface para mapeamento de termos de data
 */
interface DateTerms {
  [key: string]: number;
}

/**
 * Interface para mapeamento de dias da semana
 */
interface WeekDays {
  [key: string]: number;
}

/**
 * Classe para manipulação de datas
 */
class DateUtils {
  // Mapeamento de termos para datas relativas
  private static dateTerms: DateTerms = {
    hoje: 0,
    hj: 0,
    amanha: 1,
    amanhã: 1
  };

  // Mapeamento de dias da semana (0 = domingo, 1 = segunda, etc.)
  private static weekDays: WeekDays = {
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

  /**
   * Converte uma data em linguagem natural para o formato YYYY-MM-DD
   * @param dateText - Data em linguagem natural (hoje, amanhã) ou no formato DD/MM/YYYY
   * @returns Data no formato YYYY-MM-DD ou null se inválida
   */
  static parseDate(dateText: string): string | null {
    // Validação com Zod
    const result = DateTextSchema.safeParse(dateText);
    if (!result.success) {
      logger.error(`Erro de validação: ${result.error.message}`);
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
    
    // Verifica termos exatos como "hoje" ou "amanhã"
    if (normalizedText in this.dateTerms) {
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + this.dateTerms[normalizedText]);
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
    
    // Verificar dias da semana de forma mais precisa
    for (const [dayName, dayNumber] of Object.entries(this.weekDays)) {
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
      
      // Verificação adicional da validade da data usando Zod
      const dateValidation = DateSchema.safeParse(formattedDate);
      if (!dateValidation.success) {
        logger.error(`Data inválida após validação Zod: ${formattedDate}`);
        return null;
      }
      
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
   * @param fromDate - Data de referência
   * @param dayOfWeek - Dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
   * @returns Data da próxima ocorrência do dia da semana
   */
  static getNextDayOfWeek(fromDate: Date, dayOfWeek: number): Date {
    // Validação com Zod
    const dayValidation = DayOfWeekSchema.safeParse(dayOfWeek);
    if (!dayValidation.success) {
      logger.error(`Dia da semana inválido: ${dayOfWeek}`);
      throw new Error(`Dia da semana inválido: ${dayOfWeek}`);
    }
    
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
   * @param isoDate - Data no formato YYYY-MM-DD
   * @returns Data formatada como DD/MM/YYYY
   */
  static formatDateForDisplay(isoDate: string): string {
    if (!isoDate) return '';
    
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  }
  
  /**
   * Obtém o nome do dia da semana para uma data
   * @param date - Data para obter o nome do dia
   * @returns Nome do dia da semana em português
   */
  static getDayOfWeekName(date: string | Date): string {
    // Se a data for uma string no formato YYYY-MM-DD
    let dateObj: Date;
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
   * @returns Data de hoje
   */
  static getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  /**
   * Obtém a data de amanhã no formato YYYY-MM-DD
   * @returns Data de amanhã
   */
  static getTomorrow(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  
  /**
   * Adiciona um número de dias a uma data
   * @param date - Data base
   * @param days - Número de dias a adicionar
   * @returns Nova data no formato YYYY-MM-DD
   */
  static addDays(date: string | Date, days: number): string {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.toISOString().split('T')[0];
  }

  /**
   * Formata uma data no formato YYYY-MM-DD
   * @param date - Data a ser formatada
   * @returns Data no formato YYYY-MM-DD
   */
  static formatDateToYYYYMMDD(date: Date | string): string {
    if (typeof date === 'string') {
      // Verifica se já está no formato YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
      
      // Tenta converter de DD/MM/YYYY para YYYY-MM-DD
      const match = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (match) {
        const [, day, month, year] = match;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      
      // Se não for nenhum dos formatos acima, tenta converter usando Date
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toISOString().split('T')[0];
      }
      
      logger.error(`Formato de data não reconhecido: ${date}`);
      throw new Error(`Formato de data não reconhecido: ${date}`);
    }
    
    // Se for um objeto Date
    return date.toISOString().split('T')[0];
  }
}

export default DateUtils;
