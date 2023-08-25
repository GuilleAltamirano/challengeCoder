import { useContext } from 'react'
import style from './Home.module.sass'
import Products from '../products/Products'
import { UserContext } from '../../context/user.context'
import { OptsHomeComponent } from '../../components/OptsHome/OptsHome.component'
import customerImg from '../../assets/components/customer.png'
import managerImg from '../../assets/components/manager.png'
import dataImg from '../../assets/components/data-analytics.png'


const Home = () => {
    const {user} = useContext(UserContext)
    
    return(
        <div>
            <h2>Welcome {!user ? '' : user.fullname}</h2>

            {!user || (user.role !== 'ADMIN' && user.role !== 'PREMIUM') ?
            <Products />
            :
            <div className={style.container_OptsHome}>
                <OptsHomeComponent title={'Customer'} img={customerImg}/>
                {user && user.role !== 'ADMIN' && user.role !== 'PREMIUM' ? '' :
                    <OptsHomeComponent title={'Manager'} img={managerImg}/>
                }
                {user && user.role !== 'ADMIN' ? '' :
                    <OptsHomeComponent title={'Data'} img={dataImg}/>
                }
            </div>
            }
        </div>
    )
}

export default Home