import { handleCart, getCartItems, addItemsCart, removeCartItems } from "./functions.js"

let productData
fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((res) => res.json())
  .then((products) => {
    productData = products
    getCartItems()

    addItemsCart(productData)
    removeCartItems()
  })
  .catch((err) => console.log(err))

handleCart()
