export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  vehicleTypes: string[];
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories?: Subcategory[];
}
