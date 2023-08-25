import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user.context'
import style from './ForgotPassword.module.sass'
import { FormForgotPassword } from '../../components/Forms/Forms.component'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate ()
    const {user} = useContext(UserContext)
    
    useEffect(() => {
        if (user) return navigate('/')
    }, [user])

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