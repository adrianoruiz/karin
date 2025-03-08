export interface RobotMessage {
  id?: number;
  user_id?: number;
  message_type?: string;
  name?: string;
  message?: string;
  is_active?: boolean;
  is_default?: boolean;
  order?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
