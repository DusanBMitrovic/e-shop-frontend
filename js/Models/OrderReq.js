class OrderReq {
    customerName;
    customerAddress;
    phoneNumber;
    zipCode;
    napomena;
    // Product Ids
    products;
    constructor(
        customerName,
        customerAddress,
        phoneNumber,
        zipCode,
        napomena,
        products
    ) {
        this.customerAddress = customerAddress;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.zipCode = zipCode;
        this.napomena = napomena;
        this.products = products;
    }
}