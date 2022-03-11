class CartDTO {
  constructor({ id, timestamp, user, products = [] }) {
    if (id) this.id = id;
    this.user = user;
    this.products = products;
    this.timestamp = timestamp ?? Date.now();
  }
}

const getDTO = (dao) => {
  if (Array.isArray(dao)) return dao.map((cart) => new CartDTO(cart));
  return new CartDTO(dao);
};

export default getDTO;
