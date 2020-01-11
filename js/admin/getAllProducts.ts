async function getAllProducts() {
  let productList = [];
  await $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/products',
    success: function(response) {
      response.forEach(pr => {
        productList.push(pr);
      });
    }
  });

  return productList;
}
