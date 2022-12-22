import { renderProductDetails, getParameter } from "./functions.js"

let productData
fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((res) => res.json())
  .then((products) => {
    productData = products
    let productContainer = document.querySelector(".productContainer")
    renderProductDetails(getParameter("id"), productData, productContainer)
  })
  .catch((err) => console.log(err))