const socket = io() //declaration for use socket
let user //var user modifiable


const chatForm = document.getElementById('chatForm') //receive data 
chatForm.addEventListener('submit', newMessage) //listener click in button send

function newMessage(e) {
    e.preventDefault() //no refresh
    const messageInput = document.getElementById('chatBox') //declaring key
    const message = messageInput.value //receive value new message
    const send = { user, message } //declaring user and new message for db 
    socket.emit('newMessage', send) //emit user and message 
    chatBox.value = "" //reset key
}

//alert for other users, new connected
socket.on('newUser', data => {
    Swal.fire({
        title: `${data} connected`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 200,
        padding: '1em',
        background: '#fff',
    })
})

//print messages
socket.on('messages', data => {
    const messages = document.getElementById('messages') //declaring key to print
    messages.innerHTML = ''
    //scroll message list
    data.forEach(i => {
        const message = document.createElement('div') //create label div in handlebars
        message.classList.add('message') //new class style for message
        if (i.user === user) { //user send message?
            message.classList.add('sent') //class style for message 
        } else {
            message.classList.add('received') //message and class style
        }
        message.innerHTML = `<span>${i.user}</span><p>${i.message}</p>` //print message and user
        messages.appendChild(message) //all children to messages
    })
})