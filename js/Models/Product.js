class Product {
    numberToOrder = 0;
    id;
    name;
    type;
    numberOnStock;
    description;
    price;
    imageLink;
    constructor(id, name, type, numberOnStock, description, price, imageLink) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.numberOnStock = numberOnStock;
        this.description = description;
        this.price = price;
        this.imageLink = imageLink;
    }
}