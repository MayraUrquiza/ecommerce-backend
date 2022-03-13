class OrderDTO {
  constructor({ id, user, email, timestamp, number = null, products = [] }) {
    if (id) this.id = id;
    this.user = user;
    this.email = email;
    this.products = products;
    this.number = number ?? Math.floor(10000000 + Math.random() * 90000000);
    this.timestamp = timestamp ?? Date.now();
  }
}

const getDTO = (dao) => {
  if (Array.isArray(dao)) return dao.map((cart) => new OrderDTO(cart));
  return new OrderDTO(dao);
};

export default getDTO;
