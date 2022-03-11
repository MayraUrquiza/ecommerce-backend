export class CartProduct {
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
    this.id = id;
    this.name = name;
    this.description = description;
    this.code = code;
    this.price = price;
    this.thumbnail = thumbnail;
    this.timestamp = timestamp;
    this.quantity = quantity ?? 1;
  }
}
