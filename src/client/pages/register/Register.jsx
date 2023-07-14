import { useContext, useEffect } from 'react'
import {AuthContext} from '../../context/auth.context'
import style from './Register.module.sass'
import { Link, useNavigate } from 'react-router-dom'
import { LineComponent, GoogleComponent } from '../../components/Accessories/Accessories.component.jsx'
import { FormRegister } from '../../components/Forms/Forms.component'

const Register = () => {
    const navigate = useNavigate ()
    const {isAuth} = useContext(AuthContext)
    
    useEffect(() => {
        if (isAuth === 'true') {
            navigate('/');
        }
    }, [isAuth])

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