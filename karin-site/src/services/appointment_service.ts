import axios from 'axios';
import { Result } from '../models/result';
import config from '../config';

// Criação da instância do axios com a URL base da API
const api = axios.create({
  baseURL: config.apiUrl
});

export interface AppointmentPayload {
  user_id?: number;
  doctor_id: number;
  appointment_datetime: string;
  status?: string;
  observations?: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birthday?: string;
}

export interface AppointmentResponse {
  id: number;
  user_id: number;
  doctor_id: number;
  appointment_datetime: string;
  status: string;
  observations: string;
  created_at: string;
  updated_at: string;
}

export class AppointmentService {
  /**
   * Busca todos os agendamentos
   */
  static async getAllAppointments(): Promise<Result<AppointmentResponse[]>> {
    try {
      const response = await api.get('/appointments');
      return Result.success(response.data);
    } catch (error: any) {
      console.error('Erro ao buscar agendamentos:', error);
      const errorMessage = this.getErrorMessage(error);
      return Result.failure(errorMessage);
    }
  }

  /**
   * Busca um agendamento específico pelo ID
   */
  static async getAppointment(id: number): Promise<Result<AppointmentResponse>> {
    try {
      const response = await api.get(`/appointments/${id}`);
      return Result.success(response.data);
    } catch (error: any) {
      console.error(`Erro ao buscar agendamento ${id}:`, error);
      const errorMessage = this.getErrorMessage(error);
      return Result.failure(errorMessage);
    }
  }

  /**
   * Cria um novo agendamento
   */
  static async createAppointment(data: AppointmentPayload): Promise<Result<{ message: string; appointment: AppointmentResponse }>> {
    try {
      const response = await api.post('/appointments', data);
      return Result.success(response.data);
    } catch (error: any) {
      console.error('Erro ao criar agendamento:', error);
      const errorMessage = this.getErrorMessage(error);
      return Result.failure(errorMessage);
    }
  }

  /**
   * Atualiza um agendamento existente
   */
  static async updateAppointment(id: number, data: Partial<AppointmentPayload>): Promise<Result<{ message: string; appointment: AppointmentResponse }>> {
    try {
      const response = await api.put(`/appointments/${id}`, data);
      return Result.success(response.data);
    } catch (error: any) {
      console.error(`Erro ao atualizar agendamento ${id}:`, error);
      const errorMessage = this.getErrorMessage(error);
      return Result.failure(errorMessage);
    }
  }

  /**
   * Remove um agendamento
   */
  static async deleteAppointment(id: number): Promise<Result<{ message: string }>> {
    try {
      const response = await api.delete(`/appointments/${id}`);
      return Result.success(response.data);
    } catch (error: any) {
      console.error(`Erro ao excluir agendamento ${id}:`, error);
      const errorMessage = this.getErrorMessage(error);
      return Result.failure(errorMessage);
    }
  }

  /**
   * Formata a data e hora para o formato aceito pela API
   */
  static formatDateTimeForAPI(date: Date, time: string): string {
    const [hours, minutes] = time.split(':');
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Formato: YYYY-MM-DD HH:MM:SS
    return dateObj.toISOString().slice(0, 10) + ' ' + 
           dateObj.toTimeString().slice(0, 8);
  }

  /**
   * Extrai a mensagem de erro da resposta da API
   */
  private static getErrorMessage(error: any): string {
    if (error.response) {
      // Resposta do servidor com status de erro
      if (error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
      
      if (error.response.data && error.response.data.errors) {
        // Erros de validação
        const validationErrors = error.response.data.errors;
        const errorMessages = Object.values(validationErrors).flat();
        return errorMessages.join(', ');
      }
      
      return `Erro ${error.response.status}: ${error.response.statusText}`;
    }
    
    if (error.request) {
      // Requisição feita mas sem resposta
      return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
    }
    
    // Erro na configuração da requisição
    return error.message || 'Ocorreu um erro desconhecido.';
  }
}
