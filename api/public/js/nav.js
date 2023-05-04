const cartAssign = localStorage.getItem('cartAssign')

const cart = document.getElementById('cart')
cart.setAttribute('href', `/carts/${cartAssign}`)