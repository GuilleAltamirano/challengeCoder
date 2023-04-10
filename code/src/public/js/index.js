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
    products.forEach(product => {
        if (product.status) {
            if (product.stock > 0) {
                containerProd.innerHTML += `
                <div class="product">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <p>disponibles: ${product.stock}</p>
                    <button onclick="deleteProd('${product._id}')">Delete</button>
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
        price: parseFloat(document.getElementById('price').value),
        status: true,
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        thumbnail: []
    }
    const thumbnailInputs = document.getElementsByName('thumbnail[]')
    thumbnailInputs.forEach(input => {
        if (!input.value) product.thumbnail.push('https://www.sabormarino.com/assets/images/default.png')
        product.thumbnail.push(input.value)
    })
    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'content-type': "application/json"
        }
    })
    return
}


document.getElementById('formProd').addEventListener('submit', addProduct)

const deleteProd = async (pid) => {
    const response = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
        headers: {
            'content-type': "application/json"
        }
    })
    return
}