import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user.context'
import style from './Manager.module.sass'
import { SearchComponent } from '../../components/Search/Search.component'
import { FormNewProduct } from '../../components/Forms/Forms.component'
import { BtDeleteUserLastConnection, UsersComponent } from '../../components/Users/Users.component'
import { fetchGetUsers } from '../../helper/user.helper'
import { BtPaginateComponent } from '../../components/btPaginate/BtPaginate.component'
import { DropdownButton } from '../../components/DropdownButton/DropdownButton.componente'

const Manager = () => {
    const navigate = useNavigate ()
    const {user} = useContext(UserContext)
    
    const [keyProd, setKeyProd] = useState('v')
    const [keyExp, setKeyExp] = useState('>')
    
    const [users, setUsers] = useState(null)
    const [isActiveProd, setIsActiveProd] = useState(true)
    const [isActiveExp, setIsActiveExp] = useState(false)
    const [query, setQuery] = useState('')
    
    
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
    const getUsers = async () => {
        const response = await fetchGetUsers(query)
        setUsers(response)
        return
    }

    useEffect(() => {
        if (!user || user.role === 'USER') return navigate('/login')
        if (!users) getUsers()
    }, [query])

    return(
        <>
            {!user || (user.role !== 'ADMIN' && user.role !== 'PREMIUM') ? 
                <h2>Error</h2>
                : 
                <div className={style.container_manager}>
                    <h2>Manager</h2>
                    <div className={style.div_folder}>
                        <span onClick={challengeProd} className={isActiveProd ? style.active : ''}>Products {keyProd}</span>
                        {!user || user.role !== 'ADMIN' ? '' : 
                            <span onClick={challengeExp} className={isActiveExp ? style.active : ''}>Users {keyExp}</span>
                        }
                        {!isActiveProd ? 
                            <div className={style.div_doc}>
                                <div className={style.container_users}>
                                    <div>
                                        <h3 style={{textAlign: 'center'}}>Filters</h3>
                                        <DropdownButton title={'Role'} list={['ADMIN', 'PREMIUM', 'USER']} query={{query, setQuery}} />
                                        <DropdownButton title={'Email status'} list={['Verified', 'Disable']} query={{query, setQuery}} />
                                        <DropdownButton title={'Status'} list={['AllDocuments', 'DocumentsIncomplete']} query={{query, setQuery}} />
                                        <BtDeleteUserLastConnection />
                                    </div>
                                    <div>
                                        <h3 style={{textAlign: 'center'}}>Users</h3>
                                        <UsersComponent users={users.users} />
                                        <BtPaginateComponent pagination={users.pagination} qry={{query, setQuery}} />
                                    </div>
                                </div>
                            </div> : 
                            <div className={style.div_doc}>
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