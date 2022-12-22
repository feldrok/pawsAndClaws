export function renderProduct(container, productsFiltered) {
  let displayProduct = productsFiltered.map((product) => {
    return `
    <!-- Cards -->
    <a href="./detalleProducto.html?id=${product._id}">
    <div class="p-4 w-56 xl:w-80 flex-initial h-full active cursor-pointer transition" id="card">
      <div
        class="bg-white h-80 shadow-md border flex flex-col justify-around p-6 rounded-lg hover:scale-105 hover:shadow-none duration-300"
      >
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
      </div>
    </div>
    </a>
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
