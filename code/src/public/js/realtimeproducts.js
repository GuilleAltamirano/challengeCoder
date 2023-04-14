const socket = io()
const containerProd = document.getElementById('products')
const formProd = document.getElementById('formProd').addEventListener('submit', addProduct)

socket.emit('user', 'New User connected')
//listening list products
socket.on('products', products => {
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
})
//print new product
socket.on('newProduct', prod => {
    printProd(prod)
})
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
    //create html for delete prod
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", function () {
        deleteProd(product._id)
    })
    productDiv.appendChild(deleteButton)
    //in container product html
    containerProd.appendChild(productDiv)
}

//listening from remove
socket.on('delProd', pid => {
    delProd(pid)
})
//remove product from view
async function delProd (pid) {
    const delProd = document.getElementById(pid)
    containerProd.removeChild(delProd)
}
//add new product
async function addProduct (e) {
    e.preventDefault()
    //var
    const fileInput = document.getElementById('file')
    const formData = new FormData()
    formData.append('file', fileInput.files[0])
    //endpoint multer
    const resFile = await fetch('/api/multerProd', {
        method: 'POST',
        body: formData,
        enctype: 'multipart/form-data'
    })
    //product add
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        status: true,
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        thumbnails: []
    }
    //img multer?
    if (resFile.status === 200) {
        const resData = await resFile.json()
        product.thumbnails = [resData.payload]
    }
    //img thumbnails?
    if (resFile.status !== 200) product.thumbnails.push(document.getElementById('thumbnails').value)
    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'content-type': "application/json"
        }
    })
    //no img?
    if (product.thumbnails[0] === '') product.thumbnails[0] = 'https://placehold.co/300x300'
    //All ok
    if (response.status === 200) {
        socket.emit('newProduct', product)
    }
    return
}
//request delete produ
const deleteProd = async (pid) => {
    //req
    const response = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
        headers: {
            'content-type': "application/json"
        }
    })
    //All ok
    if (response.status === 200) {
        await delProd(pid)
        socket.emit('delProd', pid)
    }
    return
}