import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
const socket = io()
let user

Swal.fire({
    title: 'Sign up',
    html:
        '<input id="swal-input1" class="swal2-input" type="text" placeholder="User">' +
        '<input id="swal-input2" class="swal2-input" type="password" placeholder="Password">',
    preConfirm: () => { 
        const user = document.getElementById('swal-input1').value
        const password = document.getElementById('swal-input2').value
        if (!user || !password) return Swal.showValidationMessage('Please enter a user and password')
        return { user, password }
    },
    allowOutsideClick: false
    }).then((data) => {
        user = data.value.user
        socket.emit('user', data.value)
})


const chatForm = document.getElementById('chatForm')
chatForm.addEventListener('submit', newMessage)

function newMessage(e) {
    e.preventDefault()
    const messageInput = document.getElementById('chatBox')
    const message = messageInput.value
    const send = `${user} dice: ${message}`
    socket.emit('newMessage', send)
    chatBox.value = ""
}

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

socket.on('messages', data => {
    const messages = document.getElementById('messages')
    messages.innerHTML = ""
    data.forEach(i => {
        const li = document.createElement('li')
        li.textContent = i
        messages.appendChild(li)
    })
})