import logoBlack from '../../assets/components/isoTipoBlack.png'
import style from './SearchComponent.module.sass'

export const SearchComponent = ({title}) => {
    return (
        <label className={style.container_search}>
            <img src={logoBlack} alt="Logo type Ddbase color black" />
            <input type="text" placeholder={title} />
        </label>
    )
}