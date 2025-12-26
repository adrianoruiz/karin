/**
 * Arquivo de barril (barrel file) para exportar as utilidades
 * Permite importar os módulos TypeScript a partir de código JavaScript
 */

// Importa os módulos compilados do TypeScript
const DateUtils = require('../../dist/utils/dateUtils').default;
const Logger = require('../../dist/utils/logger').default;

// Exporta os módulos
module.exports = {
  DateUtils,
  Logger
};
