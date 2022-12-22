import { renderProductDetails, getParameter, handleCart } from "./functions.js"

let productData
fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((res) => res.json())
  .then((products) => {
    productData = products
    let productContainer = document.querySelector(".productContainer")
    renderProductDetails(getParameter("id"), productData, productContainer)
    addItemsCart()
  })
  .catch((err) => console.log(err))

handleCart()

function addItemsCart() {
  let cart = []
  let addItem = document.querySelector(".addItem")

  let removeItem = document.querySelector(".deleteItem")
  addItem.addEventListener("click", () => {
    let productId = addItem.getAttribute("id")
    let product = productData.find((product) => product._id == productId)
    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
    let cantidad
    let cartItems = document.querySelector(".cartItems")
    cartItems.innerHTML += `
    <div class="border flex h-24 items-center rounded-md">
      <div class="w-24 h-24">
        <img src="" alt="">
      </div>
      <div>
        <h1 class="font-bold">${product.producto}</h1>
        <h1 class="font-medium">${product.precio}</h1>
        <h2 class="font-medium">${cantidad}</h2>
      </div>
      <div>
        <svg class="cursor-pointer h-8 w-8 deleteItem hover:scale-105 duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>  
      </div>
    </div>
    `
  })

  removeItem.addEventListener("click", () => {
    let productId = removeItem.getAttribute("id")
    let product = productData.find((product) => product._id == productId)
    cart.pop(product)
    localStorage.setItem("cart", JSON.stringify(cart))
    let cantidad
    let cartItems = document.querySelector(".cartItems")
    
  })
}
