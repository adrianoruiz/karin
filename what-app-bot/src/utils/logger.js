/**
 * Classe Logger para gerenciar logs de forma centralizada
 * Permite desativar logs em produção facilmente
 */
class Logger {
  constructor(enabled = true) {
    this.enabled = enabled;
  }

  log(message, data) {
    if (this.enabled) {
      console.log(message, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  error(message, error) {
    if (this.enabled) {
      console.error(message, error);
    }
  }
  
  warn(message, data) {
    if (this.enabled) {
      console.warn(message, data ? JSON.stringify(data, null, 2) : '');
    }
  }
  
  info(message, data) {
    if (this.enabled) {
      console.info(message, data ? JSON.stringify(data, null, 2) : '');
    }
  }
}

// Exporta a classe Logger e uma instância padrão
module.exports = Logger;
