class Order {
    id;
    customerId;
    productIds;
    date;
    constructor(id, customerId, productIds, date) {
        this.id = id;
        this.customerId = customerId;
        this.productIds = productIds;
        this.date = date;
    }
}