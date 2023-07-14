import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../../context/auth.context'
import { UserContext } from '../../context/user.context'
import style from './Manager.module.sass'
import { SearchComponent } from '../../components/Search/Search.component'
import { FormNewProduct } from '../../components/Forms/Forms.component'

const Manager = () => {
    const navigate = useNavigate ()
    const {isAuth} = useContext(AuthContext)
    const {user} = useContext(UserContext)
    useEffect(() => {if (isAuth === 'false') navigate('/login')}, [isAuth])
    
    const [keyProd, setKeyProd] = useState('v')
    const [keyExp, setKeyExp] = useState('>')

    const [isActiveProd, setIsActiveProd] = useState(true)
    const [isActiveExp, setIsActiveExp] = useState(false)
    
    
    const challengeProd = (e) => {
        e.preventDefault()

        !isActiveProd ? setKeyProd('v') & setKeyExp('>') & setIsActiveExp(false) & setIsActiveProd(true) 
        : 
        setKeyProd('>') & setKeyExp('v') & setIsActiveExp(true) & setIsActiveProd(false)
        return
    }
    const challengeExp = (e) => {
        e.preventDefault()
        
        !isActiveExp ? setKeyExp('v') & setKeyProd('>') & setIsActiveProd(false) & setIsActiveExp(true)
        : 
        setKeyExp('>') & setKeyProd('v') & setIsActiveProd(true) & setIsActiveExp(false)
        return
    }
    
    return(
        <>
            {!user || (user.role !== 'ADMIN' && user.role !== 'PREMIUM') ? 
                <h2>Error</h2>
                : 
                <div className={style.container_manager}>
                    <h2>Manager</h2>

                    <div>
                        <span onClick={challengeProd} className={isActiveProd ? style.active : ''}>Products {keyProd}</span>
                        {!user || user.role !== 'ADMIN' ? '' : 
                            <span onClick={challengeExp} className={isActiveExp ? style.active : ''}>Expenses {keyExp}</span>
                        }
                        {!isActiveProd ? '' : 
                            <div>
                                <SearchComponent title='Search product in Ddbase to edit' />
                                <FormNewProduct />
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Manager