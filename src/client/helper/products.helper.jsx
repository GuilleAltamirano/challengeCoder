export const fetchProducts = async (query) => {
    return await fetch(`/api/products/?${query}`, {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') return data.payload
        return console.log(data)
    })
    .catch(err => console.log(err))
}