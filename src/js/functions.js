export function renderProduct(container, productsFiltered) {
  let displayProduct = productsFiltered.map((product) => {
    return `
    <!-- Cards -->
    <div class="p-4 w-56 xl:w-80 flex-initial h-full active cursor-pointer transition" id="card">
      <div
        class="bg-white shadow-md border flex flex-col p-4 justify-around rounded-lg hover:scale-105 hover:shadow-none duration-300"
      >
        <a href="./detalleProducto.html?id=${product._id}">
          <img
            class="h-40 rounded w-full object-cover object-center mb-6"
            src="${product.imagen}"
            alt="content"
          />
          <div class="flex flex-col items-start justify-end pt-2">
            <h3 class="font-bold text-primary-500 w-full text-xl">$${product.precio}</h3>
            <h2
            class="text-lg w-full text-gray-500 font-medium title-font mb-4"
            id="name"
            >
              ${product.producto}
            </h2>
          </div>
        </a>
        <div class="flex mt-6 items-center justify-center">
            <button id="${product._id}" class="addItem flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-300 duration-300 rounded">Agregar al carro</button>
        </div>
      </div>
    </div>
    `
  })
  displayProduct = displayProduct.join("")
  container.innerHTML = displayProduct
}

export function getParameter() {
  const queryString = location.search
  const urlParams = new URLSearchParams(queryString)
  const productId = urlParams.get("id")
  return productId
}

export function renderProductDetails(productId, data, container) {
  let products = data.find((product) => product._id == productId)
  container.innerHTML = `
    <div class="container px-5 py-24 mx-auto flex">
      <div class="lg:w-4/5 mx-auto flex flex-wrap justify-center">
        <img alt="ecommerce" class="md:w-1/2 w-10/12 object-cover object-center rounded border border-gray-200" src="${products.imagen}">
        <div class="lg:w-1/2 w-full p-8 lg:p-10 mt-6 lg:mt-0 flex flex-col">
          <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">${products.categoria}</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mt-4">${products.producto}</h1>
          <p class="leading-relaxed mt-6">${products.descripcion}</p>
          <div class="flex">
            <span class="title-font font-bold text-4xl text-gray-900 mt-6">$ ${products.precio}</span>
          </div>
          <div class="flex mt-6">
            <button id="${products._id}" class="addItem flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-300 duration-300 rounded">Agregar al carro</button>
            <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

export function handleCart() {
  const closeButton = document.querySelector(".closeButton")
  const openButton = document.querySelector(".openButton")
  const openButton2 = document.querySelector(".openButton2")
  const sidebar = document.querySelector(".sidebar")
  closeButton.addEventListener("click", () => {
    sidebar.classList.remove("right-0")
    sidebar.classList.add("right-[-320px]")
  })

  openButton.addEventListener("click", () => {
    sidebar.classList.remove("right-[-320px]")
    sidebar.classList.add("right-0")
  })

  openButton2.addEventListener("click", () => {
    sidebar.classList.remove("right-[-320px]")
    sidebar.classList.add("right-0")
  })
}

export function addItemsCart(data) {
  let cart = []
  let addItem = document.querySelectorAll(".addItem")
  if (addItem) {
    addItem.forEach((item) => {
      item.addEventListener("click", () => {
        let productId = item.getAttribute("id")
        let product = data.find((product) => product._id == productId)
        product = {
          id: product._id,
          producto: product.producto,
          precio: product.precio,
          imagen: product.imagen,
          cantidad: 1,
        }
        if (localStorage.getItem("item") == null) {
          cart.push(product)
        } else {
          cart = JSON.parse(localStorage.getItem("item"))
          let index = cart.findIndex((item) => item.producto == product.producto)
          if (index == -1) {
            cart.push(product)
          } else {
            cart[index].cantidad++
            product.cantidad = cart[index].cantidad
          }
        }
        localStorage.setItem("item", JSON.stringify(cart))
        let producto = JSON.parse(localStorage.getItem("item"))
        producto.forEach((product) => {
          product.cantidad = product.cantidad
        })
        getCartItems()
        removeCartItems()
      })
    })
  }
}

export function getCartItems() {
  let cartItems = document.querySelector(".cartItems")
  let cart = JSON.parse(localStorage.getItem("item") || "[]")
  cartItems.innerHTML = ""
  cart.forEach((product) => {
    cartItems.innerHTML += `
    <div class="border flex h-36 items-center rounded-md p-2 shadow-md mb-4">
      <div class="w-full h-full flex items-center">
        <img src="${product.imagen}" alt="" class="object-cover">
      </div>
      <div class="w-full">
        <h1 class="font-bold">${product.producto}</h1>
        <h2 class="font-light text-sm">Cantidad: <span class="font-medium text-lg">${product.cantidad}</span></h2>
        <h1 class="font-medium">Total: $ ${product.precio * product.cantidad}</h1>
      </div>
      <button>
        <svg id="${product.id}" class="deleteItem cursor-pointer h-8 w-8 hover:scale-105 duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
    `
  })
}

export function removeCartItems() {
  let cart = JSON.parse(localStorage.getItem("item"))
  let removeItem = document.querySelectorAll(".deleteItem")
  removeItem.forEach((item) => {
    item.addEventListener("click", () => {
      let productId = item.getAttribute("id")
      cart = JSON.parse(localStorage.getItem("item")).filter(
        (item) => item.id != productId
      )
      localStorage.setItem("item", JSON.stringify(cart))
      getCartItems()
    })
  })
}