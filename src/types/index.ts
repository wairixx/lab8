export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}