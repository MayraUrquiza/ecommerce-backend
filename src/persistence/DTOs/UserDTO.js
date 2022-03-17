class UserDTO {
  constructor({ id, name, password, email, age, address, phone, image }) {
    if (id) this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    if (age) this.age = age;
    if (address) this.address = address;
    this.phone = phone;
    if (image) this.image = image;
  }
}

const getDTO = (dao) => {
  if (Array.isArray(dao)) return dao.map((user) => new UserDTO(user));
  return new UserDTO(dao);
};

export default getDTO;
