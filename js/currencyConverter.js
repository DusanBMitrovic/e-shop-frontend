let EUR_RSD = 117.58154;
let valuta = 'rsd';
async function changeToEuro() {
    if (valuta !== 'eur') {
        // await convertOneEurToRsd();
        valuta = 'eur';
        changeCurrencyLabel();
        // changePriceText();
        changePriceInProduct();
    }
}

async function changeToRsd() {
    if (valuta !== 'rsd') {
        // await convertOneEurToRsd();
        valuta = 'rsd';
        changeCurrencyLabel();
        // changePriceText();
        changePriceInProduct();
    }
}
// Ovako menjam samo tekst ali u productList ostaje u RSD
function changePriceText() {
    productList.forEach(pr => {
        if (valuta === 'eur') {
            $(`#${pr.id}_price`).html(`${(pr.price / EUR_RSD).toFixed(2)}`);
        } else {
            $(`#${pr.id}_price`).html(`${pr.price.toFixed(2)}`);
        }
    });
}

// ovde menjam u productList i uvek prikazujem product.price
function changePriceInProduct() {
    productList.forEach(pr => {
        if (valuta === 'eur') {
            pr.price = (pr.price / EUR_RSD).toFixed(2);
        } else {
            pr.price = (pr.price * EUR_RSD).toFixed(0);
        }
    });
    updatePricesTextOnCurrencyChange();
}

function updatePricesTextOnCurrencyChange() {
    productList.forEach(pr => {
        $(`#${pr.id}_price`).html(`${pr.price}`);
    });
}

function changeCurrencyLabel() {
    $('.currency').html(valuta);
}

async function convertOneEurToRsd() {
    await $.ajax({
        type: 'GET',
        url: 'https://free.currconv.com/api/v7/convert?q=EUR_RSD&compact=ultra&apiKey=0e84733d34ee0ea6d7d7',
        success: function(response) {
            console.log('Conversion: ', response.EUR_RSD);
            EUR_RSD = response.EUR_RSD;
        }
    });
}