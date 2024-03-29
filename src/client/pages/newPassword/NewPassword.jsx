import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user.context'
import style from './NewPassword.module.sass'
import { useLocation, useNavigate } from 'react-router-dom';
import { FormNewPassword } from '../../components/Forms/Forms.component';

const NewPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useContext(UserContext)

    const query = new URLSearchParams(location.search);
    const id = query.get('user')
    
    useEffect(() => {
        if (user) return navigate('/')
    }, [user])
    

    return (
        <div className={style.containerNewPassword}>
            <h2>New password</h2>
            <p>Enter your new password. Remember that they cannot match the current one.</p>
            <FormNewPassword id={id}/>
            <p className={style.bottom}>If you still need help, check out</p>
        </div>
    )
}

export default NewPassword