import style from './Forms.module.sass'
import { useContext, useState } from 'react'
import { ButtonComponent } from '../Accessories/Accessories.component'
import { isValidEmail, isValidPassword, isValidName, isValidAge, isValidProduct } from '../../validations/validations'
import { LineComponent } from '../Accessories/Accessories.component'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../../context/auth.context'
import { InputCategoryProductComponent, InputCodeProductComponent, InputDescriptionProductComponent, InputPricesProductComponent, InputPromotionProductComponent, InputProviderProductComponent, InputStockProductComponent, InputTitleProductComponent, UploadsImagesComponent } from '../Input&label/ProductsInput.component'

export const FormLogin = () => {
    const {setIsAuth} = useContext(AuthContext)

    const loginFetch = async (e) => {
        e.preventDefault()

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        if (!isValidEmail(data.email)){console.log('Email invalid'); return}
        if (!isValidPassword(data.password)){console.log('Password invalid'); return}

        return await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            redirect: 'follow',
        })
        .then(res => {
            if (res.status === 200) {
                setIsAuth(true)
                window.location.reload()
            }
            return console.log(res)
        })
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
            first_name: document.getElementById('firstname').value,
            last_name: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            age: parseInt(document.getElementById('age').value)
        }
        
        if (!isValidName(data.first_name) || !isValidName(data.last_name)){console.log('Name invalid'); return}
        if (!isValidEmail(data.email)){console.log('Email invalid'); return}
        if (!isValidPassword(data.password)){console.log('Password invalid'); return}
        if (!isValidAge(data.age)){console.log('Age invalid'); return}

        return fetch('/api/users/register', {
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
                <input id='age' type="number" name='age' placeholder='Your age' min={18} max={99} required/>
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
    const navigate = useNavigate ()
    const petition = (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        if (!isValidEmail(email)){console.log('Email invalid'); return}

        return fetch('/api/sessions/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
            redirect: 'follow',
        })
        .then(res => {
            if (res.status !== 200) return
            navigate ('/login')
        })
    }
    return(
        <form className={style.form_signup} onSubmit={petition}>
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

export const FormNewPassword = ({id}) => {
    const petition = (e) => {
        e.preventDefault()

        const data = {
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        }

        if (!isValidPassword(data.password)){console.log('Password invalid'); return}
        if (!isValidPassword(data.confirmPassword)){console.log('Password invalid'); return}
        if (data.password !== data.confirmPassword){console.log('Password invalid'); return}

        return fetch(`/api/users/newPassword/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password: data.confirmPassword}),
            redirect: 'follow',
        }).then(res => res.json()).then(data => console.log(data))
    }

    return (
        <form className={style.form_signup} onSubmit={petition}>
            <div>
                <label htmlFor="password">Password</label>
                <input id='password' type="password" name="password" placeholder="Password" required/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input id='confirmPassword' type="password" name="confirmPassword" placeholder="Confirm password" required/>
            </div>

            <div className={style.button_login}>
                <ButtonComponent title="Send" />
            </div>
        </form>
    )
}

export const FormNewProduct = () => {
    //for values
    const [prodTitle, setProdTitle] = useState('')
    const [prodDescription, setProdDescription] = useState('')
    const [prodCode, setProdCode] = useState('')
    const [prodStock, setProdStock] = useState('')
    const [prodCategory, setProdCategory] = useState('')
    const [prodProvider, setProdProvider] = useState('')
    const [prodPrices, setProdPrices] = useState([])
    const [prodPromotion, setProdPromotion] = useState(false)
    const [images, setImages] = useState([])

    //fetch to api
    const fetchNewProduct = async (e) => {
        e.preventDefault()

        const promotion = prodPromotion ? 'Promotion' : 'No promotion'
        const thumbnails = images.length > 0 ? images : undefined

        const data = {
            title: prodTitle,
            description: prodDescription,
            code: prodCode,
            stock: prodStock,
            category: prodCategory,
            provider: prodProvider,
            prices: prodPrices,
            promotion,
            thumbnails
        }

        return await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json()).then(data => console.log(data))
    }

    return(
        <form className={style.form_newProduct} onSubmit={fetchNewProduct}>
            <div><InputTitleProductComponent style={style} setProdTitle={setProdTitle} /></div>
            <div><InputDescriptionProductComponent style={style} setProdDescription={setProdDescription} /></div>
            <div><InputCodeProductComponent style={style} setProdCode={setProdCode} /></div>
            <div><InputStockProductComponent style={style} setProdStock={setProdStock} /></div>
            <div><InputCategoryProductComponent style={style} setProdCategory={setProdCategory} /></div>
            <div><InputProviderProductComponent style={style} setProdProvider={setProdProvider} /></div>
            <div><InputPricesProductComponent style={style} setProdPrices={setProdPrices} prodPrices={prodPrices} /></div>
            <div><InputPromotionProductComponent style={style} setProdPromotion={setProdPromotion} /></div>
            <div><UploadsImagesComponent style={style} images={images} setImages={setImages} /></div>

            <ButtonComponent title='Create product' />
        </form>
    )
}