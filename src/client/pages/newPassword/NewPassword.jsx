import { FormNewPassword } from '../../components/Forms/Forms.component';
import style from './NewPassword.module.sass'
import { useLocation, useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const navigate = useNavigate()
    const location = useLocation();
    
    const query = new URLSearchParams(location.search);
    const id = query.get('user')
    if (!id) return navigate ('/login')

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