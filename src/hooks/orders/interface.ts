export interface OrderItem {
  id?: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_id?: string;
  status: string;
  product: string;
  total_amount: number;
  //   payment_ref?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  order_items?: OrderItem[];
}
