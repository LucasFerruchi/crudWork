class Producto {
  constructor(
    id,
    title,
    description,
    category,
    price,
    image,
    favorito = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.image = image;
    this.favorito = favorito;
  }
}
