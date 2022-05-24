export interface InputAddProductDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface OutputAddProductDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}
