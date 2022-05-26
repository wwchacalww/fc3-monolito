import Id from "../../@shared/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async find(id: string): Promise<Product> {
    const find = await ProductModel.findOne({ where: { id } });
    if (!find) {
      throw new Error(`Product whit id ${id} not found`);
    }
    return new Product({
      id: new Id(find.id),
      name: find.name,
      description: find.description,
      purchasePrice: find.purchasePrice,
      stock: find.stock,
    });
  }
}
