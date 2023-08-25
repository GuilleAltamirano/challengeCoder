import style from './UsersComponent.module.sass'
import { fetchDeleteUser, fetchDeleteUsersLastConnection } from "../../helper/user.helper"

export const UsersComponent = ({users}) => {
    const deleteUser = async ({e, uid}) => {
        e.preventDefault()
        
        await fetchDeleteUser({uid})
        window.location.reload()
        return
    }

    return (
        <div className={style.container}>
            <ul>
                <li>Image</li>
                <li>Name</li>
                <li>Email</li>
                <li>Role</li>
                <li>Email status</li>
                <li>Status</li>
            </ul>
            {users.length === 0 ? <h3>No users</h3> :
                <div>
                    { users.map((user, index) => (
                        <div key={index} className={style.user}>
                            <div className={style.img_container}><img src={user.profile} alt={`Image ${user.title}`} /></div>
                            <h3>{user.fullname}</h3>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                            <p>{user.email_verified}</p>
                            <p>{user.status}</p>
                            <button onClick={(e)=>deleteUser({e, uid: user._id})}>Delete</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export const BtDeleteUserLastConnection = () => {
    const deleteUsers = async () =>{
        await fetchDeleteUsersLastConnection()
        window.location.reload()
        return 
    }
    return <button onClick={deleteUsers}>Delete by connection date</button>
}