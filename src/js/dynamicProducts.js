import { renderProduct, handleCart, filterProducts } from "./functions.js"

let data
let productsFarmacia
let productsJuguetes
fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((res) => res.json())
  .then((products) => {
    data = products
    productsFarmacia = data.filter(
      (product) => product.categoria === "farmacia"
    )
    productsJuguetes = data.filter(
      (product) => product.categoria === "jugueteria"
    )
    const destacadosFarmacia = document.querySelector(".destacadosFarmacia")
    const destacadosJuguetes = document.querySelector(".destacadosJuguetes")
    const containerFarmacia = document.querySelector(".containerFarmacia")
    const containerJuguetes = document.querySelector(".containerJuguetes")

    if (destacadosFarmacia) renderProduct(destacadosFarmacia, productsFarmacia.slice(0, 4))
    if (destacadosJuguetes) renderProduct(destacadosJuguetes, productsJuguetes.slice(0, 4))
    if (containerFarmacia) filterProducts(containerFarmacia, productsFarmacia) 
    if (containerJuguetes) filterProducts(containerJuguetes, productsJuguetes)
  })
  .catch((err) => console.log(err))

handleCart()