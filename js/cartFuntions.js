function removeProduct(prId) {
    let targetedProduct;
    productList.forEach(pr => {
        if (pr.id.toString() === prId) {
            if (pr.numberToOrder > 0) {
                pr.numberToOrder--;
                targetedProduct = pr;
            }
        }
    });

    let numberToChange = document
        .getElementById(prId)
        .getElementsByClassName('brojKomadaZaPoruciti')[0];
    if (targetedProduct) {
        numberToChange.textContent = targetedProduct.numberToOrder;
    }
}

function addProduct(prId) {
    let targetedProduct;
    productList.forEach(pr => {
        if (pr.id.toString() === prId) {
            if (pr.numberToOrder < pr.numberOnStock) {
                pr.numberToOrder++;
                targetedProduct = pr;
            }
        }
    });

    let numberToChange = document
        .getElementById(prId)
        .getElementsByClassName('brojKomadaZaPoruciti')[0];
    if (targetedProduct) {
        numberToChange.textContent = targetedProduct.numberToOrder;
    }
}