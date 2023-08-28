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

export const TicketModal = ({ticket}) => {
    const closeModal = () => window.location.reload()


    return (
        <div className={style.container_ticket}>
            <button className={style.close} onClick={closeModal}>X</button>
            <h3>Success purchase</h3>
            <div>{ticket.success_purchase.products.map((prod, index) => (
                <div key={index}></div>
            ))}</div>
            <p>Amount: {ticket.success_purchase.amount}</p>
            <p>Code: {ticket.success_purchase.code}</p>
            <p>Date time: {ticket.success_purchase.purchase_datetime}</p>
            <h4>Failed purchase</h4>
        
        </div>
    )
}