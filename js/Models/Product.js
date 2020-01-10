class Product {
    numberToOrder = 0;
    id;
    name;
    type;
    numberOnStock;
    description;
    price;
    constructor(id, name, type, numberOnStock, description, price) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.numberOnStock = numberOnStock;
        this.description = description;
        this.price = price;
    }

}