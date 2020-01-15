cartIsEmpty = true;
productsToOrder = 0;
let customer = null;
let totalPrice;
let insertedCustomer;

function getItemsInCart() {
    $('#cartContent').html('');
    productList
        .filter(pr => pr.numberToOrder > 0)
        .forEach(pr => {
            $('#cartContent').append(`
            <tr id="cart_${pr.id}">
                <td class="clickableClass" onclick="removeProductFromCart('${
                  pr.id
                }')" style="padding:0px;"><span uk-icon="icon: trash"></span></td>
                <td><img class="uk-preserve-width uk-border-circle" src="./test.jpg" width="40" alt=""></td>
                <td class="uk-text-nowrap">${pr.name}</td>
                <td class="uk-text-nowrap"><span class="clickableClass" onclick="removeOneFromCart('${
                  pr.id
                }');">- </span><span class="kolicina">${
        pr.numberToOrder
      }</span><span class="clickableClass" onclick="addOneToCart('${
        pr.id
      }');"> +</span></td>
                <td class="uk-text-nowrap price">${pr.price *
                  pr.numberToOrder} ${valuta}</td>
            </tr>
        `);
            productsToOrder = productsToOrder + pr.numberToOrder;

            updateTotalPrice();
            console.log('getItemsInCart');

            enableButton('firstStepNextBtn');
        });
}

function removeOneFromCart(prId) {
    let targetedProduct;
    productList.forEach(pr => {
        if (pr.id.toString() === prId) {
            if (pr.numberToOrder > 0) {
                pr.numberToOrder--;
                productsToOrder--;
            }
            targetedProduct = pr;
        }
    });
    elId = 'cart_' + prId;
    let numberToChange = document
        .getElementById(elId)
        .getElementsByClassName('kolicina')[0];
    if (targetedProduct) {
        numberToChange.textContent = targetedProduct.numberToOrder;
    }
    updatePrice(prId);
    updateTotalPrice();

    if (productsToOrder === 0) {
        disableButton('firstStepNextBtn');
    }
}

function addOneToCart(prId) {
    let targetedProduct;
    productList.forEach(pr => {
        if (pr.id.toString() === prId) {
            if (pr.numberToOrder < pr.numberOnStock) {
                pr.numberToOrder++;
                productsToOrder++;
            }
            targetedProduct = pr;
        }
    });
    elId = 'cart_' + prId;
    let numberToChange = document
        .getElementById(elId)
        .getElementsByClassName('kolicina')[0];
    numberToChange.textContent = targetedProduct.numberToOrder;
    updatePrice(prId);
    updateTotalPrice();

    if (productsToOrder > 0) {
        console.log('addOneToCart');

        enableButton('firstStepNextBtn');
    }
}

function updatePrice(prId) {
    let targetedProduct;
    productList.forEach(pr => {
        if (pr.id.toString() === prId) {
            targetedProduct = pr;
        }
    });
    elId = 'cart_' + prId;
    let numberToChange = document
        .getElementById(elId)
        .getElementsByClassName('price')[0];
    numberToChange.textContent = `${targetedProduct.numberToOrder *
    targetedProduct.price} rsd`;
}

function updateTotalPrice() {
    totalPrice = 0;
    productList
        .filter(pr => pr.numberToOrder > 0)
        .forEach(pr => {
            totalPrice += pr.numberToOrder * pr.price;
            console.log('total price: ', totalPrice);
        });
    let numberToChange = document.getElementsByClassName('totalPrice')[0];
    numberToChange.textContent = `${totalPrice.toFixed(2)}`;
}

function removeProductFromCart(prId) {
    let targetedProduct;
    productList.forEach(pr => {
        if (pr.id.toString() === prId) {
            productsToOrder = productsToOrder - pr.numberToOrder;
            pr.numberToOrder = 0;
            targetedProduct = pr;
        }
    });
    elId = 'cart_' + prId;

    updateTotalPrice();
    let targetedDiv = $(`#${elId}`).remove();
    if (productsToOrder === 0) {
        disableButton('firstStepNextBtn');
    }
}

function enableButton(btnId) {
    $(`#${btnId}`).prop('disabled', false);
}

function disableButton(btnId) {
    $(`#${btnId}`).prop('disabled', true);
}

function goToStepOne() {
    $('.stepOne').addClass('uk-active');
    $('.stepTwo').removeClass('uk-active');
    $('.stepThree').removeClass('uk-active');
}

function goToStepTwo() {
    $('.stepOne').removeClass('uk-active');
    $('.stepTwo').addClass('uk-active');
    $('.stepThree').removeClass('uk-active');
}

function goToStepThree() {
    $('.stepOne').removeClass('uk-active');
    $('.stepTwo').removeClass('uk-active');
    $('.stepThree').addClass('uk-active');
    getCustomerFormData();
    showDataOnStepThree();
}

function getCustomerFormData() {
    let name;
    let address;
    let zipCode;
    let phoneNumber;
    let napomena;
    let data = $('#customerForm').serializeArray();
    console.log('Form data: ', data);
    data.forEach(d => {
        if (d.name === 'imePrezime') {
            name = d.value;
        }
        if (d.name === 'adresa') {
            address = d.value;
        }
        if (d.name === 'postanskiBroj') {
            zipCode = d.value;
        }
        if (d.name === 'brojTelefona') {
            phoneNumber = d.value;
        }
        if (d.name === 'napomena') {
            napomena = d.value;
        }
    });

    customer = new Customer(name, address, zipCode, phoneNumber, napomena);
    console.log('Customer: ', customer);
    console.log('Customer JSON ', JSON.stringify(customer));
}

function showDataOnStepThree() {
    showCustomerDataOnStepThree();
    showProductsDataOnStepThree();
}

function showCustomerDataOnStepThree() {
    $('.customerInfo').html(`
                            <p>${customer.customerName}</p>
                            <p>${customer.customerAddress}</p>
                            <p>${customer.zipCode}</p>
                            <p>${customer.phoneNumber}</p>
                            <p>${customer.napomena}</p>
                            `);
}

function showProductsDataOnStepThree() {
    $('.productInfoTable').html('');
    productList
        .filter(pr => pr.numberToOrder > 0)
        .forEach(pr => {
            $('.productInfoTable').append(`
            <tr>
                <td>${pr.name}</td>
                <td>${pr.numberToOrder} kom</td>
                <td>${pr.price * pr.numberToOrder} rsd</td>
            </tr>
        `);
        });
    $('.productInfoTable').append(`
            <tfoot>
            <tr>
                <td></td>
                <td>Ukupno:</td>
                <td>${totalPrice} rsd</td>
            </tr>
            </tfoot>
        `);
}

async function order() {
    await insertCustomer(customer);

    let orderArray = [];
    setTimeout(() => {
        productList.forEach(pr => {
            if (pr.numberToOrder > 0) {
                orderArray.push(
                    new Order(insertedCustomer.id, pr.id, pr.numberToOrder)
                );
            }
        });

        orderArray.forEach(o => {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/productToOrder',
                data: JSON.stringify(o),
                contentType: 'application/json',
                success: function(response) {
                    console.log('Response ', response);
                }
            });
        });
    }, 200);

    UIkit.notification({
        message: 'Hvala na porudzbini! :)',
        pos: 'top-right',
        status: 'success'
    });
}

async function insertCustomer(customer) {
    console.log('USAO ', customer);
    // NE MOZE DA SALJE SA CONTENT TYPE JSON, A MORA TAKO
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/orderInfo',
        data: JSON.stringify(customer),
        contentType: 'application/json',
        success: function(response) {
            console.log('Uspesan dodat proizvod ', response);
            insertedCustomer = response;
        },
        error: function(textStatus, errorThrown) {
            console.log('Doslo je do greske ', textStatus);
        }
    });

    // $.post('http://localhost:3000/orderInfo', JSON.stringify(customer));

    // fetch('http://localhost:3000/productToOrder', {
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: customer,
    //         method: 'POST'
    //     })
    //     .then(res => {
    //         console.log('response: ', res);
    //     })
    //     .catch(error => {
    //         console.log('error: ', error);
    //     });
}