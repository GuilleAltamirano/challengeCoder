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
    const [dataProd, setDataProd] = useState({title: false, description: false, code: false, stock: false, category: false, provider: false, prices: {}, promotion: false, thumbnails: []})
    const [objError, setObjError] = useState({title: false, description: false, code: false, stock: false, category: false, provider: false, prices: false, promotion: false, thumbnails: false})
    const [existErr, setExistErr] = useState(false)
    //handleError
    const handleError = ({err, key}) => {
        setObjError((prevError) => ({
            ...prevError, [key]: err
        }))
        return setExistErr(true)
    }

    const isError = () => {
        if (!dataProd.title || objError.title.length > 0) objError.title.length > 0 ? handleError({err: objError.title, key: 'title'}) : handleError({err: 'Title is required', key: 'title'})
        if (!dataProd.description || objError.description.length > 0) objError.description.length > 0 ? handleError(objError.description) : handleError({err: 'Description is required', key: 'description'})
        if (!dataProd.code || objError.code.length > 0) objError.code.length > 0 ? handleError(objError.code) : handleError({err: 'Code is required', key: 'code'})
        if (!dataProd.stock || objError.stock.length > 0) objError.stock.length > 0 ? handleError(objError.stock) : handleError({err: 'Stock is required', key: 'stock'})
        if (!dataProd.category || objError.category.length > 0) objError.category.length > 0 ? handleError(objError.category) : handleError({err: 'Category is required', key: 'category'})
        if (!dataProd.provider || objError.provider.length > 0) objError.provider.length > 0 ? handleError(objError.provider) : handleError({err: 'Provider is required', key: 'provider'})
        if (dataProd.prices === 0 || objError.prices.length > 0) objError.prices.length > 0 ? handleError(objError.prices) : handleError({err: 'Prices is required}', key: 'prices'})
        if (dataProd.promotion && objError.promotion.length > 0) objError.promotion ? handleError(objError.provider) : handleError({err: 'Provider is required', key: 'promotion'})
        return
    }

    //fetch to api
    const fetchNewProduct = async (e) => {
        e.preventDefault()
        
        setExistErr(false)
        isError()
        if (existErr) return

        const promotion = dataProd.promotion ? 'Promotion' : 'No promotion'
        const thumbnails = dataProd.thumbnails.length > 0 ? dataProd.thumbnails : undefined

        const data = {
            title: dataProd.title,
            description: dataProd.description,
            code: dataProd.code,
            stock: dataProd.stock,
            category: dataProd.category,
            provider: dataProd.provider,
            prices: dataProd.prices,
            promotion,
            thumbnails
        }

        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json()).then(data => {
            const errorExisting = 'Existing product'
            const errorKeys = 'Product keys invalid'
            const resOk = 'success'

            if (data.error === errorExisting) {
                setObjError({title: false, description: false, code: errorExisting, stock: false, category: false, provider: false, prices: false, promotion: false, thumbnails: false})
                return Swal.fire(
                    errorExisting,
                    'Try another product, if the error persists contact support',
                    'error'
                )
            }
            if (data.error === errorKeys) return Swal.fire(
                errorKeys,
                'Please check the fields and try again',
                'error'
            )
            if (data.status === resOk) {
                setDataProd({title: false, description: false, code: false, stock: false, category: false, provider: false, prices: {}, promotion: false, thumbnails: []})
                return Swal.fire(
                    resOk,
                    'Product created!!',
                    resOk
                ).then(result => window.location.reload())
            }
        })
    }

    return(
        <form className={style.form_newProduct} onSubmit={fetchNewProduct}>
            <div><InputTitleProductComponent style={style} setProdTitle={setDataProd} existErr={objError.title} addError={setObjError} handleError={handleError} /></div>
            <div><InputDescriptionProductComponent style={style} setProdDescription={setDataProd} existErr={objError.description} addError={setObjError} handleError={handleError} /></div>
            <div><InputCodeProductComponent style={style} setProdCode={setDataProd} existErr={objError.code} addError={setObjError} handleError={handleError} /></div>
            <div><InputStockProductComponent style={style} setProdStock={setDataProd} existErr={objError.stock} addError={setObjError} handleError={handleError} /></div>
            <div><InputCategoryProductComponent style={style} setProdCategory={setDataProd} existErr={objError.category} addError={setObjError} handleError={handleError} /></div>
            <div><InputProviderProductComponent style={style} setProdProvider={setDataProd} existErr={objError.provider} addError={setObjError} handleError={handleError} /></div>
            <div><InputPricesProductComponent style={style} setProdPrices={setDataProd} existErr={objError.prices} addError={setObjError} handleError={handleError} /></div>
            <div><InputPromotionProductComponent style={style} setProdPromotion={setDataProd} prices={dataProd.prices} existErr={objError.promotion} addError={setObjError} handleError={handleError} /></div>
            <div><UploadsImagesComponent style={style} images={dataProd.thumbnails} setImages={setDataProd} existErr={objError.thumbnails} addError={setObjError} handleError={handleError} /></div>

            <ButtonComponent title='Create product' />
        </form>
    )
}