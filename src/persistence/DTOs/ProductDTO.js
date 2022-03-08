class ProductDTO {
  constructor({
    id,
    name,
    description,
    code,
    price,
    thumbnail,
    stock,
  }) {
    if (id) this.id = id;
    this.name = name;
    this.description = description;
    this.code = code;
    this.price = typeof price === "string" ? parseInt(price) : price;
    this.thumbnail = thumbnail;
    this.stock = typeof stock === "string" ? parseInt(stock) : stock;
    this.timestamp = Date.now();
  }
}

const getDTO = (dao) => {
  if (Array.isArray(dao)) return dao.map((product) => new ProductDTO(product));
  return new ProductDTO(dao);
};

export default getDTO;