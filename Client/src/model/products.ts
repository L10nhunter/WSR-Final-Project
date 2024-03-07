import products from '@/data/products.json';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

export function getProducts(): Product[] {
    return products.items;
}