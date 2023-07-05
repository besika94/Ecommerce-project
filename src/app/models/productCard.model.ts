export interface ProductCardModel {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  amount: number;
}

export interface productsModel {
  total: number;
  skip: number;
  limit: number;
  products: Array<ProductCardModel>;
}
