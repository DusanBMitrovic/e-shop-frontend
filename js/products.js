let productList = [];
let productsFromDb;
$(document).ready(async function() {
    await setProductListFromDb();

    productList.forEach(pr => {
        $('#products').append(`
        <div id="${pr.id}-wrapper" style="position:relative">
        <div class="uk-card uk-card-hover uk-card-default" id="${pr.id}">
            <div class="uk-card-header">
                <h3 class="uk-card-title">${pr.name}</h3>
                <span class="uk-text">${pr.price} rsd</span>
            </div>
            <div class="uk-card-body">
                <p>${pr.description}<p>
                <div class="uk-card-media-bottom">
                    <img src="${pr.imageLink}" alt="">
                </div>
            </div>
            <div class="uk-card-footer">
                <span name="brojKomadaNaStanju" class="uk-margin-medium-right uk-text-meta">Na stanju: <span class="uk-text-bold"> ${pr.numberOnStock}</span></span>
                <span class="clickableClass" uk-icon="icon: minus" onclick="removeProduct('${pr.id}');"></span>
                <span name="brojKomadaZaPoruciti" class=" brojKomadaZaPoruciti uk-badge uk-margin-small-left uk-margin-small-right uk-padding-small">0</span>
                <span class="clickableClass" uk-icon="icon: plus" onclick="addProduct('${pr.id}');"></span>
            </div>
        </div>
        </div>`);
    });

    checkSoldOutProducts();
});
// DA SE POZOVE SVAKI KAD PUT KAD SE NESTO PORUCI I NA UCITAVANJU STRANICE !!!
function checkSoldOutProducts() {
    if (productList.length > 0) {
        productList.forEach(pr => {
            if (pr.numberOnStock === 0) {
                setOutOfStockImg(pr.id);
            }
        });
    }
}

function setOutOfStockImg(prId) {
    $('#' + prId + '-wrapper').append(
        '<img src="./img/outOfStock.png" style="position: absolute;top: 25%; padding: 63px; left: 5%;">'
    );
    $('#' + prId).addClass('outOfStock');
}

async function setProductListFromDb() {
    productsFromDb = await getAllProducts();

    productsFromDb.forEach(obj => {
        productList.push(
            new Product(
                obj.id,
                obj.name,
                obj.type,
                obj.numberOnStock,
                obj.description,
                obj.price,
                obj.image
            )
        );
    });
}