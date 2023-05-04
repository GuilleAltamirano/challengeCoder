import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'

let cartAssign = localStorage.getItem('cartAssign')


const addToCartButtons = document.querySelectorAll('.add-to-cart')

addToCartButtons.forEach(button => {
    //var for button
    const productId = button.getAttribute('_id')
    const incrementButton = document.getElementById(`increment-${productId}`)
    const decrementButton = document.getElementById(`decrement-${productId}`)
    const countPrint = document.getElementById(`count-${productId}`)
    //stock max
    const maxCount = countPrint.getAttribute('max')
    let count = parseInt(countPrint.textContent)
    
    //increment button 
    incrementButton.addEventListener('click', function() {
        //operation
        if (count < parseInt(maxCount)) {
            count++
            countPrint.textContent = count
        }
        if (count === parseInt(maxCount)) {
            incrementButton.disabled = true
        }
        if (count > 1) {
            decrementButton.disabled = false
        }
        return
    })
    
    //decrement button
    decrementButton.addEventListener('click', function() {
        //operation
        if (count > 1) {
            count--
            countPrint.textContent = count
        }
        if (count === 1) {
            decrementButton.disabled = true
        }
        if (count < parseInt(maxCount)) {
            incrementButton.disabled = false
        }
        return
    })
})


addToCartButtons.forEach(button => {
    button.addEventListener('click', addProd)
});

async function addProd(e) {
    e.preventDefault()
    const productId = e.target.getAttribute('_id')
    const qtyElement = document.getElementById(`count-${productId}`)
    const qty = parseInt(qtyElement.textContent)
    //create cart
    const response = await fetch('/api/carts', {
        method: 'POST',
        headers: {
            'content-type': "application/json"
        }
    })
    const data = await response.json()
    //cart assigned
    if (!cartAssign) cartAssign = data.payload[0]._id
    //save cartAssign in localStorage
    localStorage.setItem('cartAssign', cartAssign)
    //add prod in cart
    const addProd = await fetch(`/api/carts/${cartAssign}/products/${productId}`, {
        method: 'POST',
        headers: {
            'content-type': "application/json"
        }
    })
    const addQty = await fetch(`/api/carts/${cartAssign}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify({ quantity: qty })
    })
    //All ok?
    if (addQty.status !== 200) return Swal.fire({
        title: `Error to add product in cart`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })

    return Swal.fire({
        title: `Add product in cart success`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })
}