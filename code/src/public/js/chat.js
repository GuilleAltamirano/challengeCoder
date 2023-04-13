import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
const socket = io()
const chatBox = document.getElementById('chatBox')
chatBox.addEventListener(newSms)
const messages = document.getElementById('messages')

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
    }).then((result) => {
    controller(result)
})

const controller = (data) => {
    const user = data.value.user
    const password = data.value.password
}

const newSms = (e) => {
    e.preventDefault()

    const sms = chatBox.value
    return sms
}