export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock_quantity?: number;
  created_at: string;
  updated_at: string;
}
