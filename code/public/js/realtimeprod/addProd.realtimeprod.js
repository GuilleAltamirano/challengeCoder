import { containerProd } from "../realtimeproducts.js"
import { socket } from "../realtimeproducts.js"

//add new product
export async function addProduct (e) {
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

//remove product from view
export async function delProd (pid) {
    const delProd = document.getElementById(pid)
    containerProd.removeChild(delProd)
}