import style from './Forms.module.sass'
import { ButtonComponent } from '../Accessories/Accessories.component'
import { isValidEmail, isValidPassword, isValidName, isValidAge } from '../../validations/validations'
import { LineComponent } from '../Accessories/Accessories.component'

export const FormLogin = () => {
    const loginFetch = (e) => {
        e.preventDefault()

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        if (!isValidEmail(data.email)){console.log('Email invalid'); return}
        if (!isValidPassword(data.password)){console.log('Password invalid'); return}

        return fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            redirect: 'follow',
        })
        .then(res => console.log(res))
    }
    
    return (
        <form className={style.form_signup} onSubmit={loginFetch}>
            <div>
                <label htmlFor="email">Email</label>
                <input id='email' type="email" name="email" placeholder="Email" min={6} required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id='password' type="password" name="password" placeholder="Password" min={6} required/>
            </div>

            <div className={style.button_login}>
                <ButtonComponent title="Login" />
            </div>
        </form>
    )
}

export const FormRegister = () => {
    const registerFetch = (e) => {
        e.preventDefault()

        const data = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            age: document.getElementById('age').value
        }
        if (!isValidName(data.firstname) || !isValidEmail(data.lastname)){console.log('Name invalid'); return}
        if (!isValidEmail(data.email)){console.log('Email invalid'); return}
        if (!isValidPassword(data.password)){console.log('Password invalid'); return}
        if (!isValidAge(data.age)){console.log('Age invalid'); return}

        return fetch('/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            redirect: 'follow',
        })
        .then(res => console.log(res))
    }
    return (
        <form className={style.form_signup} onSubmit={registerFetch}>
            <div>
                <label htmlFor="firstname">What's your firstname?</label>
                <input id='firstname' type="text" name='firstname' placeholder='Your firstname' min={3} required/>
            </div>
            <div>
                <label htmlFor="lastname">What's your lastname?</label>
                <input id='lastname' type="text" name='lastname' placeholder='Your lastname' min={3} required/>
            </div>
            <div>
                <label htmlFor="email">What's your email?</label>
                <input id='email' type="email" name='email' placeholder='Email' min={6} required/>
            </div>
            <div>
                <label htmlFor="password">Create a password</label>
                <input id='password' type="password" name='password' placeholder='Password' min={6} required/>
            </div>
            <div>
                <label htmlFor="age">What's your age?</label>
                <input id='age' type="number" name='age' placeholder='Your age' min={18} required/>
            </div>
            
            <LineComponent />

            <p>By clicking Sign Up, you agree to the Ddbase <a href="#">Terms and Conditions</a> of Use</p>

            <div className={style.button_login}>
                <ButtonComponent  title="SignUp" />
            </div>
        </form>
    )
}

export const FormForgotPassword = () => {
    const fetch = (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        if (!isValidEmail(email)){console.log('Email invalid'); return}

        return fetch('/api/sessions/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
            redirect: 'follow',
        })
        .then(res => console.log(res))
    }
    return(
        <form className={style.form_signup}>
            <div>
                <label htmlFor="email">Email</label>
                <input id='email' type="email" name="email" placeholder="Email" required/>
            </div>

            <div className={style.button_login}>
                <ButtonComponent title="Send" />
            </div>
        </form>
    )
}