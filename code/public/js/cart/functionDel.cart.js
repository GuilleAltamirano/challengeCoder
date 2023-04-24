import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'

let cartAssign = localStorage.getItem('cartAssign')

//delete product in cart
export async function delProd(e) {
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

    return window.location.reload()
}

export async function delAllProds(){
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

    return window.location.reload()
}

