import { useContext } from 'react'
import style from  './ModalsComponents.module.sass'
import { AuthContext } from '../../context/auth.context'

export const ModalUserComponent = ({ user, closeModal }) => {
    const {setIsAuth} = useContext(AuthContext)

    const fetchLogout = () => {
        return fetch('/api/sessions/logout', {method: 'POST'})
        .then(data => {
            closeModal()
            setIsAuth(false)
            window.location.reload()
        })
    }

    return (
        <div className={style.container_user}>
            <button className={style.close} onClick={closeModal}>X</button>
            <h3>{user.fullname}</h3>
            <p>Role: {user.role}</p>
            <p>Email: {user.email}</p>
            <button onClick={fetchLogout}>Logout</button>
        </div>
    )
}
