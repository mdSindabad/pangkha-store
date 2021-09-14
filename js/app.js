// fetching data
const loadProducts = () => {
  const container = document.getElementById("all-products");
  // show spinner
  container.innerHTML = `
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => showProducts(data, container))
  .catch(err => console.log(err));
};
// initial api call
loadProducts();

// show all product in UI 
const showProducts = (products, container) => {
  // hide spinner
  container.innerHTML = '';
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("col-md-4");
    div.innerHTML = `<div class="single-product">
    <div>
    <img class="product-image" src=${image}></img>
    </div>
    <h3 class="product-name">${product.title}</h3>
    <p>Category: ${product.category}</p>
    <h2>Price: $ ${product.price}</h2>
    <div class="d-flex justify-content-around">
    <p><b>Rating:</b> ${product.rating.rate}</p>
    <p><b>Count:</b> ${product.rating.count}</p>
    </div>
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    <button id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getDetails(${product.id})">Details</button></div>
    `;
    container.appendChild(div);
  }
};

// add total number of products to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// function for capturing value from html
const getInnerTextValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInnerTextValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInnerTextValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInnerTextValue("price") + getInnerTextValue("delivery-charge") +
    getInnerTextValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// show details
const showDetails = (product,modal) => {
  const div = document.createElement("div");
  div.classList.add('row');
  div.innerHTML = `
  <div class="row">
    <div class="col-3">
      <image src="${product.image}" class="img-fluid" />
    </div>
    <div class="col-9">
      <h4>${product.title}</h4>
      <p class="product-descriptions">${product.description}</p>
      <div class="d-flex justify-content-between">
        <p><b>Rating:</b> ${product.rating.rate}</p>
        <p><b>Count:</b> ${product.rating.count}</p>
      </div>
      <h6><b>Price:</b> $${product.price}<h6>
    </div>
  </div>
  `
  // hide modal spinner
  modal.innerHTML = '';
  // show details in modal
  modal.appendChild(div);
}
// load sibgle product
const loadSingleProducts = (id) => {
  const modal = document.querySelector('.modal-body');
  // show modal spinner
  modal.innerHTML = `
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `;
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data, modal))
    .catch(err => console.log(err));
};
// product details
const getDetails = (id) => {
  loadSingleProducts(id)
}