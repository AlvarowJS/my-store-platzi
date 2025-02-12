const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlPicsumPhotos(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 1000);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);

    if(!product) {
      throw boom.notFound('product not found')
    }
    if(product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product;
  }


  async update(data, id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...data
    };
    return this.products[index];

  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not found')
    }

    this.products.splice(index, 1);
    return { id }
  }
}
module.exports = ProductsService
