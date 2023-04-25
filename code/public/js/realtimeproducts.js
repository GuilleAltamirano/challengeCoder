import { printProd } from "./realtimeprod/print.realtimeprod.js"
import { addProduct } from "./realtimeprod/addProd.realtimeprod.js"
import { delProd } from "./realtimeprod/addProd.realtimeprod.js"

const socket = io()
export const containerProd = document.getElementById('products')
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

//listening from remove
socket.on('delProd', pid => {
    delProd(pid)
})


