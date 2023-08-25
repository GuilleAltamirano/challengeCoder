import style from  './ModalsComponents.module.sass'

export const ModalUserComponent = ({ user, closeModal }) => {

    const fetchLogout = () => {

        return fetch('/api/sessions/logout', {method: 'DELETE'})
        .then(data => {
            window.location.reload()
            closeModal()
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
