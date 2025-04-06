/**
 * Classe Logger para gerenciar logs de forma centralizada
 * Permite desativar logs em produção facilmente
 */
class Logger {
  private enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  log(message: string, data?: any): void {
    if (this.enabled) {
      console.log(message, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  error(message: string, error?: any): void {
    if (this.enabled) {
      console.error(message, error);
    }
  }
  
  warn(message: string, data?: any): void {
    if (this.enabled) {
      console.warn(message, data ? JSON.stringify(data, null, 2) : '');
    }
  }
  
  info(message: string, data?: any): void {
    if (this.enabled) {
      console.info(message, data ? JSON.stringify(data, null, 2) : '');
    }
  }
}

export default Logger;
