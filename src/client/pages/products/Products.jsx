import { useEffect, useState, useContext } from 'react'
import style from './Products.module.sass'
import { SearchComponent } from '../../components/Search/Search.component'
import { fetchProducts } from '../../helper/products.helper'
import { DropdownButton } from '../../components/DropdownButton/DropdownButton.componente'
import { ProductsComponent } from '../../components/products/Products.component'
import { UserContext } from '../../context/user.context'
import { BtPaginateComponent } from '../../components/btPaginate/BtPaginate.component'
import { BtDelProdsInCart, BuyProds, CartComponent } from '../../components/Cart/Cart.component'
import { BtLoginToBuy } from '../../components/btProducts/BtProducts.component'

const Products = () => {
    const {user} = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [payload, setPayload] = useState({})
    const [filters, setFilters] = useState({})
    const [query, setQuery] = useState('')

    const priceOptions = ['Asc', 'Des']
    
    const getProducts = async () => {
        const prods = await fetchProducts(query)
        setPayload(prods)
        setLoading(false)
    }

    useEffect(() => {getProducts(query)}, [query, user])
    useEffect(() => {
        if (!(filters.allCategories && filters.allProvider) && (payload.allCategories && payload.allProvider)) {
            return setFilters({allCategories: payload.allCategories, allProvider: payload.allProvider})
        }
    }, [payload])
    return (
        <div>
            {!user || (user.role !== 'PREMIUM' && user.role !== 'ADMIN') ? '' : <h2>Customer</h2>}
            {loading ? 'Loading...'
            :
            <div className={style.customer}>
                <div className={style.container_extra}>
                    <div className={style.container_filter}>
                        <h3>Filters</h3>
                        {!(filters.allCategories && filters.allProvider) ? 'Loading...' : 
                            <>
                                <DropdownButton title="Category" list={filters.allCategories} query={{query, setQuery}} />
                                <DropdownButton title="Provider" list={filters.allProvider} query={{query, setQuery}} />
                            </>
                        }
                        <DropdownButton title="Price" list={priceOptions} query={{query, setQuery}} />
                    </div>
                    <div className={style.container_cart}>
                        <h3>Cart</h3>
                        {!user || user.role === 'ADMIN' ? <h4>No permission</h4> : 
                            <>
                                <CartComponent user={user}/>
                                <BtDelProdsInCart user={user} />
                                <BuyProds  user={user}/>
                            </>
                        }
                    </div>
                </div>
                <div className={style.container_products}>
                    <h3>Products</h3>
                    <div className={style.search}>
                        <SearchComponent title={'Search product in Ddbase'}/>
                    </div>
                    <ProductsComponent docs={payload.docs} user={user} quantity={1} />
                    <BtPaginateComponent pagination={payload.pagination} qry={{query, setQuery}}/>
                </div>
            </div>

            }
        </div>
    )
}

export default Products