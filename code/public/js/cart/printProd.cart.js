

export const printProdCart = async (data) => {
    //destructuring
    const {i, prod, prodDiv, img, title, desc, price, btDiv, update} = data
    //product container
    prodDiv.classList.add('product-container')//class container prod

    //img
    img.classList.add('product-image') //add class img prod
    img.setAttribute('src', prod.thumbnails[0])//select first thumbnail
    prodDiv.appendChild(img) //img is children to prod container

    //title
    title.classList.add('product-title')//add class title prod
    title.textContent = prod.title //print value to prod title
    prodDiv.appendChild(title) //title is children to prod container

    //description
    desc.classList.add('product-description') //add class description prod
    desc.textContent = prod.description //print value description prod
    prodDiv.appendChild(desc) //description is children to prod container

    //price
    price.classList.add('product-price') //add class price prod
    price.textContent = prod.price //print value to prod price
    prodDiv.appendChild(price) //price is children to prod container

    //button increment, decrement and quantity
    btDiv.classList.add('product-details')
    //create decrease button product
    const decreaseQuantityButton = document.createElement('button') //create button -
    decreaseQuantityButton.classList.add('decrease-quantity') //add class button decrement
    decreaseQuantityButton.textContent = '-' //print value - in button
    //function decrement
    decreaseQuantityButton.addEventListener('click', function () {
        decrement({quantityNumber, update, i, prod, increaseQuantityButton, decreaseQuantityButton})
    })
    btDiv.appendChild(decreaseQuantityButton) //button decrement is children to container buttons

    //quantity product
    const quantityNumber = document.createElement('p') //create label
    quantityNumber.classList.add('quantity-number') //add class style
    quantityNumber.textContent = i.quantity //print value quantity to cart
    btDiv.appendChild(quantityNumber, update, i) //product quantity is children to container buttons

    //create increase button product
    const increaseQuantityButton = document.createElement('button') //create button
    increaseQuantityButton.classList.add('increase-quantity') //add class styles
    increaseQuantityButton.textContent = '+' //print value + to button increment
    //listener function increment quantity
    increaseQuantityButton.addEventListener('click', function () {
        increment({quantityNumber, update, i, prod, increaseQuantityButton, decreaseQuantityButton})
    })
    btDiv.appendChild(increaseQuantityButton) //button increment is children to container buttons

    //create append child button to product div
    prodDiv.appendChild(btDiv) //container buttons is children to container product

    //create button delete product
    const deleteProductButton = document.createElement('button') //create button delete product
    deleteProductButton.classList.add('delete-product-button') //add class style button delete product
    deleteProductButton.setAttribute('_id', prod._id) //product id for delete to cart
    deleteProductButton.textContent = 'Delete Product' //print value text button
    prodDiv.appendChild(deleteProductButton) //button delete product is children to container product
}

async function decrement ({quantityNumber, update, i, prod, increaseQuantityButton, decreaseQuantityButton}) {
    let count = quantityNumber.textContent //count value is?
        //count decrement is valid
        if (count > 1) {
            count-- //count value decrement
            i.quantity = count //prod quantity is new count
            quantityNumber.textContent = count //print new count
        }
        //count = 1
        if (count === 1) {decreaseQuantityButton.disabled = true} //disable button decrement
        // count is < to product stock
        if (count < prod.stock) {increaseQuantityButton.disabled = false} //button increment active
        //update active
        update.disabled = false
        //return
        return
}

async function increment ({quantityNumber, update, i, prod, increaseQuantityButton, decreaseQuantityButton}) {
    let count = quantityNumber.textContent //count = product quantity
        //count = product stock
        if (count === prod.stock) {increaseQuantityButton.disabled = true} //button increment disabled
        //count is < to product stock
        if (count < prod.stock) {
            count++ //new count
            i.quantity = count //product quantity is new count
            quantityNumber.textContent = count //print new count
        }
        //count is > 1
        if (count > 1) {decreaseQuantityButton.disabled = false} //button decrement active
        //update active
        update.disabled = false
        //return
        return
}
