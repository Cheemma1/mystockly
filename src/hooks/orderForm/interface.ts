export interface OrderFormProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface OrderForm {
  id: string;
  user_id: string;
  business_name: string;
  business_description: string;
  slug: string;
  products: OrderFormProduct[];
  whatsapp: string;
  instagram: string;
  location: string;
  created_at: string;
  updated_at: string;
}
