import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user.context'
import style from './Login.module.sass'
import { Link, useNavigate } from 'react-router-dom'
import { FormLogin } from '../../components/Forms/Forms.component.jsx'
import { LineComponent, GoogleComponent } from '../../components/Accessories/Accessories.component.jsx'

const Login = () => {
    const navigate = useNavigate ()
    const {user} = useContext(UserContext)

    useEffect(() => {
        if (user) return navigate('/')
    }, [user])

    return (
        <div className={style.container_login}>
            <h2>Login to Ddbase</h2>

            <FormLogin/>
            <Link to='/forgotpassword'>Forgot your password?</Link>

            <LineComponent />
            <div className={style.google_button}><GoogleComponent /></div>
            <LineComponent />

            <p>Don't have an account? <Link to='/register'>Sign up for Ddbase</Link></p>
        </div>
    )
}

export default Login