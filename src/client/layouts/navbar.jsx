import logo from '../assets/isoTipo.png'
import style from './navbar.module.sass'

const NavTop = () => {
    return (
        <nav className={`${style.navTop}`} >
            <img src={logo} alt="Logo Ddbase" />
            <h1>Ddbase</h1>
        </nav>
    );
}

export default NavTop