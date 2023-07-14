import style from './OptsHome.module.sass'
import { useNavigate } from 'react-router-dom'

export const OptsHomeComponent = ({img, title}) => {
    const navigate = useNavigate()
    const redirectOption = () => {
        navigate(`/${title}`)
    }

    return(
        <div className={style.container_opt} onClick={redirectOption}>
            <div>
                <img src={img} alt={`Image ${title}`} />
            </div>
            <h3>{title}</h3>
        </div>
    )
}