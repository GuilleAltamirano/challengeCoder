import logoBlack from '../../assets/components/isoTipoBlack.png'
import searchImg from '../../assets/components/search.png'
import style from './SearchComponent.module.sass'

export const SearchComponent = ({title}) => {
    return (
        <label className={style.container_search}>
            <img src={logoBlack} alt="Logo type Ddbase color black" />
            <input type="text" placeholder={title} />
            <a href=""><img src={searchImg} alt="img search" /></a>
        </label>
    )
}