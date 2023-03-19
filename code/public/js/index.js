const socket = io()

socket.emit('user', 'New User connected')
socket.on('products', async products => {
    console.log(await products)
})