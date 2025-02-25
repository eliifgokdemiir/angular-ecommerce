export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number | null;
    imageUrl: string;
    category: string;
    rating: number;
    stock: number;
    featured?: boolean;
  }