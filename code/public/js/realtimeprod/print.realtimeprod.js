import { delProd } from "./addProd.realtimeprod.js"
import { socket } from "../realtimeproducts.js"
import { containerProd } from "../realtimeproducts.js"

//print products
export async function printProd(product) {
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

//request delete product
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