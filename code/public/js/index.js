const socket = io()

socket.emit('user', 'New User connected')

socket.on('products', async products => {
    const containerProd = document.getElementById('products')
    containerProd.innerHTML = ''
    if (products.length > 0) {
        await products.map(product => {
            if (product.status) {
                containerProd.innerHTML += `
                <div class="product">
                    <img src=${product.thumbnail} class="imgProd" />
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <p>disponibles: ${product.stock}</p>
                    <button onclick="deleteProd(${product.id})">Delete</button>
                </div>
                `
            }
        })
    }
})

const addProduct = () => {
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        status: true,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    console.log('enviando new product')
    socket.emit('newProduct', product)
    return
}

const deleteProd = (id) => {
    socket.emit('idProd', id)
    return
}