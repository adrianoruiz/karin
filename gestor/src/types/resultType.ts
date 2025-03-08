export interface Result<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
