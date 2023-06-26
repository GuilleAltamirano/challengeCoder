import style from './Register.module.sass'
import { Link } from 'react-router-dom'
import { LineComponent, GoogleComponent } from '../../components/Accessories/Accessories.component.jsx'
import { FormRegister } from '../../components/Forms/Forms.component'

const Register = () => {
    return (
        <div className={style.container_signup}>
            <h2>Sign up for Ddbase</h2>

            <FormRegister />

            <LineComponent />
            <div><GoogleComponent /></div>
            <LineComponent />

            <p>You already have an account? <Link to="/login">Log in</Link></p>
        </div>
    )
}

export default Register