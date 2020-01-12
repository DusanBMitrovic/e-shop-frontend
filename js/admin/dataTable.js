var editor;
$(document).ready(function() {
    editor = new $.fn.dataTable.Editor({
        ajax: 'https://localhost/e-drogerie/e-drogerie-datatableEditor/reservationTable.php',
        table: '#productTable',
        idSrc: 'product.id',
        fields: [{
                label: 'Ime:',
                name: 'product.name'
            },
            {
                label: 'Opis:',
                name: 'product.description'
            },
            {
                label: 'Tip proizvoda:',
                name: 'product.productTypeId',
                type: 'select'
            },
            {
                label: 'Link do slike:',
                name: 'product.image',
                def: 'https://localhost/e-drogerie/e-drogerie-front/img/product.jpg'
            },
            {
                label: 'Na stanju:',
                name: 'product.numberOnStock'
            },
            {
                label: 'Cena:',
                name: 'product.price'
            }
        ]
    });

    $('#productTable').DataTable({
        dom: 'Bfrtip',
        columns: [
            { data: 'product.id' },
            { data: 'product.name' },
            { data: 'product.description' },
            { data: 'product_type.name' },
            { data: 'product.image' },
            { data: 'product.numberOnStock' },
            { data: 'product.price' }
        ],
        ajax: {
            url: 'https://localhost/e-drogerie/e-drogerie-datatableEditor/reservationTable.php',
            dataSrc: 'data'
        },
        buttons: [
            { extend: 'create', editor: editor },
            { extend: 'edit', editor: editor },
            { extend: 'remove', editor: editor }
        ],
        select: true
    });
});

$(document).ready(function() {
    console.log('USAO');

    $('#ordersTable').DataTable({
        columns: [
            { data: 'id' },
            { data: 'datetime' },
            { data: 'customerName' },
            { data: 'customerAddress' },
            { data: 'zipCode' },
            { data: 'phoneNumber' },
            { data: 'napomena' },
            { data: 'products[, ].id' }
        ],
        ajax: {
            url: 'http://localhost:3000/orders',
            dataSrc: ''
        }
    });
});