import { updateCart } from './cart/update.cart.js'
import { printProdCart } from './cart/printProd.cart.js'
import {delProd, delAllProds} from './cart/functionDel.cart.js'

let cartAssign = localStorage.getItem('cartAssign')
const viewCart = document.getElementById('viewCart')

searchCart()

async function searchCart () {
    const response = await fetch(`/api/carts/${cartAssign}`)
    const data = await response.json()

    //update cart
    const update = document.createElement('button')
    await updateCart({ data, update, viewCart })

    data.payload.forEach(i => {
        //create container for products
        const prod = i.product
        const prodDiv = document.createElement('div')
        
        //create img product
        const img = document.createElement('img')

        //create title product
        const title = document.createElement('h3')
        
        //create description product
        const desc = document.createElement('p')
        
        //create price product
        const price = document.createElement('p')
        
        //create container button product
        const btDiv = document.createElement('div')    

        printProdCart({
            i,
            prod,
            prodDiv,
            img,
            title,
            desc,
            price, 
            btDiv, 
            update
        })
        
        //append child the product div to view cart
        viewCart.appendChild(prodDiv)
    })
    //delete prod
    const deleteProductButtons = document.querySelectorAll('.delete-product-button') //product to delete
    deleteProductButtons.forEach(button => {
        button.addEventListener('click', delProd)
    })


    //delete products
    const delProds = document.createElement('button') //create button delete all products
    delProds.classList.add('button-delete-products') //class style button delete all products
    delProds.textContent = 'Delete all prods' //print value button delete all products
    delProds.addEventListener('click', delAllProds) //listener click in button delete all products
    viewCart.appendChild(delProds) //button delete products is children to container cart
}