export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  video?: string;
  description: string;
  is_available?: boolean | number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
