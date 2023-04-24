import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'

let cartAssign = localStorage.getItem('cartAssign')

export const updateCart = async (date) => {
    //destructuring
    const { data, update, viewCart } = date


    update.classList.add('button-update-cart') //add class to button update
    
    update.disabled = true //Disabled until modification is made

    update.textContent = 'Update cart'    //Value button

    viewCart.appendChild(update) //Update is children to viewCart
    
    //Listener button click
    update.addEventListener('click', async function() {
        //making request
        const updateCart = await fetch(`/api/carts/${cartAssign}`, {
            method: 'PUT',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({ products: data.payload }),
        })
        //error request
        if (updateCart.status !== 200) return Swal.fire({
            title: `Error update cart`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            width: 200,
            padding: '1em',
            background: '#fff',
        })
        
        //reload success
        return window.location.reload()
    })
}