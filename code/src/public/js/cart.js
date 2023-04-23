import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'

let cartAssign = localStorage.getItem('cartAssign')
const viewCart = document.getElementById('viewCart')

async function searchCart () {
    const response = await fetch(`/api/carts/${cartAssign}`)
    const data = await response.json()

    data.payload.forEach(i => {
        //create container for products
        const prod = i.product
        const productDiv = document.createElement('div')
        productDiv.classList.add('product-container')
        //create img product
        const productImg = document.createElement('img')
        productImg.classList.add('product-image')
        productImg.setAttribute('src', prod.thumbnails[0])
        productDiv.appendChild(productImg)
        //create title product
        const productTitle = document.createElement('h3')
        productTitle.classList.add('product-title')
        productTitle.textContent = prod.title
        productDiv.appendChild(productTitle)
        //create description product
        const productDescription = document.createElement('p')
        productDescription.classList.add('product-description')
        productDescription.textContent = prod.description
        productDiv.appendChild(productDescription)
        //create price product
        const productPrice = document.createElement('p')
        productPrice.classList.add('product-price')
        productPrice.textContent = prod.price
        productDiv.appendChild(productPrice)
        //create container button product
        const productDetailsDiv = document.createElement('div')
        productDetailsDiv.classList.add('product-details')
        //create decrease button product
        const decreaseQuantityButton = document.createElement('button')
        decreaseQuantityButton.classList.add('decrease-quantity')
        decreaseQuantityButton.textContent = '-'
        productDetailsDiv.appendChild(decreaseQuantityButton)
        //create quantity product
        const quantityNumber = document.createElement('p')
        quantityNumber.classList.add('quantity-number')
        quantityNumber.textContent = i.quantity
        productDetailsDiv.appendChild(quantityNumber)
        //create increase button produc
        const increaseQuantityButton = document.createElement('button')
        increaseQuantityButton.classList.add('increase-quantity')
        increaseQuantityButton.textContent = '+'
        productDetailsDiv.appendChild(increaseQuantityButton)
        //create append child button to product div
        productDiv.appendChild(productDetailsDiv)
        //create button delete product
        const deleteProductDiv = document.createElement('div')
        const deleteProductButton = document.createElement('button')
        deleteProductButton.classList.add('delete-product-button')
        deleteProductButton.setAttribute('_id', prod._id)
        deleteProductButton.textContent = 'Delete Product'
        deleteProductDiv.appendChild(deleteProductButton)
        productDiv.appendChild(deleteProductDiv)
        //append child the product div to view cart
        viewCart.appendChild(productDiv)
    })
    //delete prod
    const deleteProductButtons = document.querySelectorAll('.delete-product-button')
    deleteProductButtons.forEach(button => {
        button.addEventListener('click', delProd)
    })
    //delete products
    const delProds = document.createElement('button')
    delProds.textContent = 'Delete all prods'
    delProds.addEventListener('click', delAllProds)
    viewCart.appendChild(delProds)
}
searchCart()

//logic quantity



//delete product in cart
async function delProd(e) {
    const productId = e.target.getAttribute('_id')

    const response = await fetch(`/api/carts/${cartAssign}/products/${productId}`, {
        method: 'delete',
        enctype: 'multipart/form-data'
    })

    if (response.status !== 200) return Swal.fire({
        title: `Error to delete product in cart`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })

    return Swal.fire({
        title: `Delete product in cart success`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })
}

async function delAllProds(){
    const response = await fetch(`/api/carts/${cartAssign}`, {
        method: 'delete',
        enctype: 'multipart/form-data'
    })

    if (response.status !== 200) return Swal.fire({
        title: `Error to delete product in cart`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })

    return Swal.fire({
        title: `Delete product in cart success`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })
}