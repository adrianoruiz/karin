import { OrderType } from "@/types/orderType";


export interface OrderIndicators {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
}

export interface OrdersResponse {
  data: {
  indicators: {
    total_orders: number;
    total_revenue: string;
    average_ticket: number;
    canceled_orders: number;
  };
  orders: {
    per_page: number;
    total: number;
    current_page: number;
    payment_condition_id: number;
    data: OrderType[];
  }};
}
