// Actividad para entregar #3

const fs = require("fs");

const writeFile = (path, products) =>
  fs.promises.writeFile(path, JSON.stringify({ products: products }));

const readFile = async (path) => {
  const asyncGetProducts = await fs.promises.readFile(path);
  const parseResult = JSON.parse(asyncGetProducts);
  return parseResult;
}

class ProductManager {

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  initialize = async () => {

    const existsFile = fs.existsSync(this.path);

    if (existsFile) {
      console.log("El archivo ya existía");
      const { products } = await readFile(this.path);
      this.products = products;
    } else {
      await writeFile(this.path, this.products);
      console.log("El archivo se creó exitosamente");
    }
  }

  addProduct = async ({ title, desc, price, thumbnail, code, stock }) => {

    const findedProduct = this.products.find(
      (product) => product.title === title || product.code === code
    );

    if (findedProduct) {
      console.log(`Error, ya existe el producto ${title} o el código ${code}`);
    } else {
      const id = this.products.length + 1; // Esto porque quiero que el id me coincida con la posición dentro del arreglo
      this.products.push({
        id,
        title,
        desc,
        price,
        thumbnail,
        code,
        stock,
      });
      await writeFile(this.path, this.products);
      console.log("Producto creado exitosamente");
    }
  };

  getProducts = async () => {
    return this.products;
  }

  getProducts = async (limit) => {
    return { products: [this.products.slice(0, limit)] };
  }

  getProductById = (id) => {
    const findedProduct = this.products.find(
      (product) => product.id === parseInt(id)
    );

    if (findedProduct) {
      return findedProduct;
    } else {
      console.log("Not found");
    }
  }


  updateProduct = async (id, newProduct) => {

    const findIndexProduct = this.products.findIndex(
      (product) => product.id === id
    )

    if (findIndexProduct !== -1) {

      const id = this.products[findIndexProduct].id;
      this.products[findIndexProduct] = {
        id,
        ...newProduct,
      }
      await writeFile(this.path, this.products);
      console.log("Actualizado correctamente");
    } else {
      console.log("No se encuentra un producto con el id proporcionado");
    }
  }

  deleteProduct = async (id) => {

    const findIndexProduct = this.products.findIndex(
      (product) => product.id === id
    )

    if (findIndexProduct !== -1) {

      const newProducts = this.products.filter(
        (product) => product.id !== id
      )

      await writeFile(this.path, newProducts);
      console.log("Eliminado correctamente");
    } else {
      console.log("No se encuentra un producto con el id proporcionado");
    }
  }
}

async function main() {

  const productManager = new ProductManager("./data.json");
  await productManager.initialize();

  const newProduct = {
    title: "Jet",
    description: "Chocolatina x 12g",
    price: 700,
    thumbnail: "https://lavaquita.co/products/chocolatina_jet_12g_leche",
    code: "cho001",
    stock: 500
  };

  await productManager.addProduct(newProduct);

  const newProduct2 = {
    title: "m&m's de maní",
    description: "m&m's x 49.3g",
    price: 4000,
    thumbnail: "https://www.tiendasjumbo.co/chocolates-m-ms-mani-x-49-3-g/p",
    code: "cho002",
    stock: 200
  };

  await productManager.addProduct(newProduct2);

  const newProduct3 = {
    title: "m&m's de chocolate",
    description: "m&m's x 47.9g",
    price: 4000,
    thumbnail: "https://www.tiendasmetro.co/chocolates-m-ms-x-47-9g/p",
    code: "cho003",
    stock: 200
  };

  await productManager.addProduct(newProduct3);

  const newProduct4 = {
    title: "Milka de leche",
    description: "Chocolatina milka x 100g",
    price: 15000,
    thumbnail: "https://www.exito.com/milka-leche-340124/p",
    code: "cho004",
    stock: 120
  };

  await productManager.addProduct(newProduct4);

  const newProduct5 = {
    title: "Toblerone",
    description: "Chocolate x 100g",
    price: 13000,
    thumbnail: "https://www.larebajavirtual.com/chocolate-toblerone-milk-122032/p",
    code: "cho005",
    stock: 150
  };

  await productManager.addProduct(newProduct5);

  const newProduct6 = {
    title: "Jumbo maní",
    description: "Chocolatina x 100g",
    price: 5200,
    thumbnail: "https://www.locatelcolombia.com/7702007212402-chocolatina-jumbo-mani-x-100g/p",
    code: "cho006",
    stock: 100
  };

  await productManager.addProduct(newProduct6);

  const newProduct7 = {
    title: "Waffer Jet",
    description: "Galleta cubierta de chocolate x 22g",
    price: 800,
    thumbnail: "https://www.eurosupermercados.com.co/jet-wafer-vainilla-x-22-grs.html",
    code: "cho007",
    stock: 600
  };

  await productManager.addProduct(newProduct7);

  const newProduct8 = {
    title: "Hershey's cookies n' creme",
    description: "Chocolatina x 43g",
    price: 4500,
    thumbnail: "https://www.exito.com/chocolate-cookies-n-creme-24906/p",
    code: "cho008",
    stock: 80
  };

  await productManager.addProduct(newProduct8);

  const newProduct9 = {
    title: "Hershey's chocolate",
    description: "Chocolatina x 43g",
    price: 4500,
    thumbnail: "https://www.tiendasjumbo.co/chocolate-hersheys-barra-x-43-g/p",
    code: "cho009",
    stock: 80
  };

  await productManager.addProduct(newProduct9);

  const newProduct10 = {
    title: "Milky way",
    description: "Chocolate x 52.2g",
    price: 4000,
    thumbnail: "https://www.tiendasjumbo.co/barra-de-chocolate-milky-way-con-turron-y-arequipe-x-52-2-g/p",
    code: "cho010",
    stock: 150
  };

  await productManager.addProduct(newProduct10);

}

main();

module.exports = ProductManager;