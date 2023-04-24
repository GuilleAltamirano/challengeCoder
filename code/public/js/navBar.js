const path = `http://localhost:8080/` //route 
let cartAssign = localStorage.getItem('cartAssign') //id cart assign 

const products = document.getElementById('productsNav')//label a for products
products.setAttribute('href', path) //add attribute href with address route

const cart = document.getElementById('cartNav') //label a for cart
cart.setAttribute('href', `${path}carts/${cartAssign}`) //add attribute href with address route and id cart assign

const realTime = document.getElementById('realTimeNav') //Label a for real time products
realTime.setAttribute('href', `${path}realtimeproducts`) //add attribute href with address

const chat = document.getElementById('chatNav') //label a for chats
chat.setAttribute('href', `${path}chats`) //add attribute href with address

