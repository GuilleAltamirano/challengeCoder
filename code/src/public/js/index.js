const socket = io()
const containerProd = document.getElementById('products')

socket.emit('user', 'New User connected')

socket.on('products', products => {
    containerProd.innerHTML = ''
    products.forEach(product => {
        if (product.status) {
            if (product.stock > 0) {
                printProd(product)
            }
        }
    })
})

socket.on('newProduct', prod => {
    printProd(prod)
})

function printProd (product) {
    containerProd.innerHTML += `
    <div class="product" id="${product._id}">
        <img src="${product.thumbnails[0]}"/>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <p class="stock">disponibles: ${product.stock}</p>
        <button onclick="deleteProd('${product._id}')">Delete</button>
    </div>
    `
}

socket.on('delProd', pid => {
    delProd(pid)
})

function delProd (pid){
    const delProd = document.getElementById(pid)
    containerProd.removeChild(delProd)
}

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
        thumbnails: document.getElementById('thumbnails')
    }
    
    printProd(product)
    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'content-type': "application/json"
        }
    })
    socket.emit('newProduct', product)
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
    delProd(pid)
    socket.emit('delProd', pid)
    return
}

// if (!products.length > 0) {
//     containerProd.innerHTML += `
//         <p>doesn't exist products</p>
//     `
// }