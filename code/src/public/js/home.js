const containerProd = document.getElementById('products')

const init = (products) => {
    containerProd.innerHTML = ''
    //no products
    if (products.length <= 0) {
        const text = document.createElement('p')
        text.classList.add("noProducts")
        text.textContent = "doesn't exist products"
        containerProd.appendChild(text)
    }
    //exist products
    products.forEach(product => {
        printProd(product)
    })
}

//print products
async function printProd(product) {
    //create div
    const productDiv = document.createElement("div")
    productDiv.classList.add("product")
    productDiv.id = product._id
    //create html for img prod
    const productImg = document.createElement("img")
    productImg.src = product.thumbnails[0]
    productDiv.appendChild(productImg)
    //create html for title prod
    const productTitle = document.createElement("h3")
    productTitle.textContent = product.title
    productDiv.appendChild(productTitle)
    //create html for description prod
    const productDescription = document.createElement("p")
    productDescription.textContent = product.description
    productDiv.appendChild(productDescription)
    //create html for price prod
    const productPrice = document.createElement("p")
    productPrice.classList.add("price")
    productPrice.textContent = "$" + product.price
    productDiv.appendChild(productPrice)
    //create html for stock prod
    const productStock = document.createElement("p")
    productStock.classList.add("stock")
    productStock.textContent = "disponibles: " + product.stock
    productDiv.appendChild(productStock)

    //in container product html
    containerProd.appendChild(productDiv)
}
