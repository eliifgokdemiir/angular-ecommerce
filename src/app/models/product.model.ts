export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    category: string;
    rating: number;
    inStock: boolean;
  }