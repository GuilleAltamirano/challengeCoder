const socket = io()

socket.emit('user', 'New User connected')

socket.on('products', products => {
    const containerProd = document.getElementById('products')
    containerProd.innerHTML = ''
    if (!products.length > 0) {
        containerProd.innerHTML += `
            <p>doesn't exist products</p>
        `
    }
    products.map(product => {
        if (product.status) {
            if (product.stock > 0) {
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
        }
    })
})

async function addProduct (e) {
    e.preventDefault()
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
    // const response = await fetch(`/api/products`, {
    //     method: 'POST',
    //     body: JSON.stringify(product),
    //     headers: {
    //         'content-type': "multipart/form-data"
    //     }
    // })
    socket.emit('newProduct', product)
    return
}

document.getElementById('formProd').addEventListener('submit', addProduct)

const deleteProd = (id) => {
    socket.emit('idProd', id)
    return
}