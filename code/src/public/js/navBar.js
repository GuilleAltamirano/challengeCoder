const path = `http://localhost:8080/`
let cartAssign = localStorage.getItem('cartAssign')


const products = document.getElementById('productsNav')
products.setAttribute('href', path)

const cart = document.getElementById('cartNav')
cart.setAttribute('href', `${path}carts/${cartAssign}`)

const realTime = document.getElementById('realTimeNav')
realTime.setAttribute('href', `${path}realtimeproducts`)

const chat = document.getElementById('chatNav')
chat.setAttribute('href', `${path}chats`)

