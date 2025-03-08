import { AbstractHttp } from '@/services/api';
import { executeWithResult, Result } from '@/utils/result';
import { RobotMessage } from '../models/RobotMessage';

interface RobotMessagesResponse {
  data: RobotMessage[];
}

class RobotMessagesRepository extends AbstractHttp {
  async fetchMessages(petshopId: number): Promise<Result<RobotMessagesResponse>> {
    return executeWithResult(async () => {
      const response = await this.get<RobotMessagesResponse>('robots', {
        params: { petshop_id: petshopId }
      });
      return response.data;
    });
  }

  async updateMessage(id: number, message: string): Promise<Result<any>> {
    return executeWithResult(async () => {
      const response = await this.put<any>(`robots/${id}`, {
        message
      });
      return response.data;
    });
  }

  async updateMessageStatus(id: number): Promise<Result<any>> {
    return executeWithResult(async () => {
      const response = await this.put<any>(`robots/${id}/update-status`, {});
      return response.data;
    });
  }

  async restoreDefaultMessage(id: number): Promise<Result<any>> {
    return executeWithResult(async () => {
      const response = await this.put<any>(`robots/${id}/restore-default`, {});
      return response.data;
    });
  }

  async sendTestMessage(data: {
    phone_number: string;
    message: string;
    message_type: string;
    petshop_id: number;
    name: string;
  }): Promise<Result<any>> {
    return executeWithResult(async () => {
      const response = await this.post<any>('robots/test/send-whatsapp', data);
      return response;
    });
  }

  async updateBotStatus(userId: number, status: boolean): Promise<Result<boolean>> {
    return executeWithResult(async () => {
      const response = await this.put<any>(`settings/${userId}/bot-status`, {
        status
      });
      return response.data.petfy_bot_active;
    });
  }
}

export const robotMessagesRepository = new RobotMessagesRepository();
