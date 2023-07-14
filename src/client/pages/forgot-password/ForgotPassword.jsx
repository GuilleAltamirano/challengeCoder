import { useContext, useEffect } from 'react'
import {AuthContext} from '../../context/auth.context'
import style from './ForgotPassword.module.sass'
import { FormForgotPassword } from '../../components/Forms/Forms.component'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate ()
    const {isAuth} = useContext(AuthContext)
    
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth])

    return(
        <div className={style.container_forgotPassword}>
            <h2>Password reset</h2>
            <p>Enter your email address that you used to register. We'll send you an email with your code to reset your password.</p>
            <FormForgotPassword />
            <p className={style.bottom_forgotPassword}>If you still need help, check out</p>
        </div> 
    ) 
}

export default ForgotPassword