export const fetchCart = async (cid) => {
    return await fetch(`/api/carts/${cid}`, {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') return data.payload
        return console.log(data)
    })
    .catch(err => console.log(err))
}

export const addProdInCartFetch = async ({pid, cid}) => {
    return await fetch(`/api/carts/${cid}/products/${pid}`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') return data.status
        return console.log(data)
    })
    .catch(err => console.log(err))
}

export const upQtyProdInCart = async ({pid, cid, qty}) => {
    return await fetch(`/api/carts/${cid}/products/${pid}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({quantity: qty})
    })
}

export const deleteAllProds = async ({cid}) => {
    return await fetch(`/api/carts/${cid}`, {
        method: 'DELETE'
    }).then(res => res.json()).then(data => {
        if (data.status === 'success') return data.payload
        return console.log(data);
    }) 
}

export const purchase = async ({cid}) => {
    return await fetch(`/api/carts/${cid}/purchase`, {
        method: 'POST'
    }).then(res => res.json()).then(data => {
        if (data.status === 'success') return data.payload
        return console.log(data);
    }) 
}