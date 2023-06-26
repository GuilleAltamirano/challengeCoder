import style from './Login.module.sass'
import { Link } from 'react-router-dom'
import { FormLogin } from '../../components/Forms/Forms.component.jsx'
import { LineComponent, GoogleComponent } from '../../components/Accessories/Accessories.component.jsx'

const Login = () => {
    return (
        <div className={style.container_login}>
            <h2>Login to Ddbase</h2>

            <FormLogin/>
            <a href="#">Forgot your password?</a>

            <LineComponent />
            <div className={style.google_button}><GoogleComponent /></div>
            <LineComponent />

            <p>Don't have an account? <Link to='/register'>Sign up for Ddbase</Link></p>
        </div>
    )
}

export default Login