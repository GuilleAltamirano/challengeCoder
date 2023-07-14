import { useContext, useState } from 'react'
import style from './navbar.module.sass'
import logo from '../assets/isoTipo.png'
import imgUser from '../assets/components/user.png'
import { UserContext } from '../context/user.context'
import { ModalUserComponent } from '../components/modals/Modals.components'

const NavTop = () => {
    const {user} = useContext(UserContext)
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <nav className={style.navTop}>
            <div className={style.logo}>
            <div className={style.container_img}>
                <img src={logo} alt="Logo Ddbase" />
            </div>
            <h1>Ddbase</h1>
            </div>
            {!user ? '' : (
            <div className={style.imgUser}>
                <img src={imgUser} alt="Image user" onClick={openModal} />
                {modalOpen && <ModalUserComponent user={user} closeModal={openModal} />}
            </div>
            )}
        </nav>
    )
}

export default NavTop