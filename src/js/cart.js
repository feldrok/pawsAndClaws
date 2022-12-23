import { handleCart, getCartItems, addItemsCart } from "./functions.js"

let productData
fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((res) => res.json())
  .then((products) => {
    productData = products
    getCartItems()
    addItemsCart(productData)
  })
  .catch((err) => console.log(err))

handleCart()

