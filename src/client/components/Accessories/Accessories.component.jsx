import style from './Accessories.module.sass'
import logoGoogle from '../../assets/components/logoGoogle.png'

export const ButtonComponent = ({title}) => {
    return (
        <button className={style.button_component} type='submit'>{title}</button>
    )
}

export const LineComponent = () => {
    return (
        <p className={style.line_separator}></p>
    )
}

export const GoogleComponent = () => {
    return (
        <a className={style.init_google} href="/api/sessions/auth/google"> 
            <img src={logoGoogle} alt="Image Logo Google" />
            <p>Continue with Google</p>
        </a>
    )
}