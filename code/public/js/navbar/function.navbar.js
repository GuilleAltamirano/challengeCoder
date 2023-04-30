export const functionMode = async () => {
    async function init() {
        let mode = await getCookies()
        modeStyle(mode)
    }
    
    init()
    
    //mode dark?
    const btMode = document.querySelector('#btMode')//label for value in mode
    //listening click in button mode and changing the value
    btMode.addEventListener('click', async function (e) {
        e.preventDefault() //no refresh
        let mode = !(JSON.parse(await getCookies()))
        const response = await fetch('/api/cookies/mode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mode })
        })
        modeStyle(mode)
        return
    })
    
    //changing styles
    function modeStyle (mode) {
        const htmlEl = document.querySelector("html")
        if (mode === true || mode === 'true') return htmlEl.classList.add("dark-mode")
        //else
        return htmlEl.classList.remove("dark-mode")
    }
    
    //request type get server cookies
    async function getCookies () {
        const response = await fetch('/api/cookies/mode')
        const data = await response.json()
        //declaring mode, if undefined mode = false
        let mode = data.payload || false
        return mode
    }
}

export const logoutFunction = (btLogout) => {
    btLogout.addEventListener('click', async () => {
        const response = await fetch('/api/sessions', {
            method: 'DELETE'
        })
        const data = await response.json()

        if (data.status === true) {return location.reload()}

        Swal.fire({
            title: `${data.payload}`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            width: 200,
            padding: '1em',
            background: '#fff',
        })
    })
}