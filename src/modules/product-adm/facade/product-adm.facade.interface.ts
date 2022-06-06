export interface AddProductFacadeInput {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckStockFacadeInput {
  productId: string;
}

export interface CheckStockFacadeOutput {
  id: string;
  stock: number;
}

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInput): Promise<void>;
  checkStock(input: CheckStockFacadeInput): Promise<CheckStockFacadeOutput>;
}
