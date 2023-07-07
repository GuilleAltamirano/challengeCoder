export const fetchProducts = async () => {
    return await fetch('/api/products', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') return data.payload
        return console.log(data)
    })
    .catch(err => console.log(err))
}