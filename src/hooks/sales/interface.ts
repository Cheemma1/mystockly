export interface Sale {
  id: string;
  order_id: string;
  amount: number;
  created_at: string;
  user_id: string;
  orders?: {
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
    order_items?: Array<{
      product_name: string;
      quantity: number;
      unit_price: number;
    }>;
  };
}
