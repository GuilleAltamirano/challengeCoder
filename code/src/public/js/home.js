import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'

let cartAssign = localStorage.getItem('cartAssign')

const addToCartButtons = document.querySelectorAll('.add-to-cart')

addToCartButtons.forEach(button => {
    button.addEventListener('click', addProd)
});

async function addProd(e) {
    e.preventDefault()
    const productId = e.target.getAttribute('_id')
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
    //All ok?
    if (await addProd.status !== 200) return Swal.fire({
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