import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe("Product Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => await sequelize.close());

  it("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product A",
      description: "Product description",
      purchasePrice: 50,
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });

    expect(product.id.id).toBe(productDb.id);
    expect(product.name).toBe(productDb.name);
    expect(product.description).toBe(productDb.description);
    expect(product.purchasePrice).toBe(productDb.purchasePrice);
    expect(product.stock).toBe(productDb.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    ProductModel.create({
      id: "1",
      name: "Product A",
      description: "product description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product = await productRepository.find("1");
    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product A");
    expect(product.description).toBe("product description");
    expect(product.purchasePrice).toBe(100);
    expect(product.stock).toBe(10);
  });
});
