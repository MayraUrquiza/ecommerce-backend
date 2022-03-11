class CartProductDTO {
  constructor({
    id,
    name,
    description,
    code,
    price,
    thumbnail,
    timestamp,
    quantity,
  }) {
    if (id) this.id = id;
    this.name = name;
    this.description = description;
    this.code = code;
    this.price = typeof price === "string" ? parseInt(price) : price;
    this.thumbnail = thumbnail;
    this.timestamp = timestamp ?? Date.now();
    this.quantity = quantity ?? 1;
  }
}

const getDTO = (dao) => {
  if (Array.isArray(dao))
    return dao.map((product) => new CartProductDTO(product));
  return new CartProductDTO(dao);
};

export default getDTO;
