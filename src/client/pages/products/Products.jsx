import { useEffect, useState } from 'react'
import style from './Products.module.sass'
import { SearchComponent } from '../../components/Search/Search.component'
import { fetchProducts } from '../../helper/products.helper'
import { DropdownButton } from '../../components/DropdownButton/DropdownButton.componente'

const Products = () => {
    const [loading, setLoading] = useState(true)
    const [payload, setPayload] = useState({})
    const [query, setQuery] = useState('')

    const priceOptions = ['asc', 'des']

    useEffect(() => {
        const getProducts = async () => {
            const prods = await fetchProducts()
            setPayload(prods)
            setLoading(false)
        }
        getProducts()
    }, [])

    return (
        <div className={style.container_products}>
            <h2>Products</h2>
            
            <SearchComponent />

            {loading ? 'Loading...'
            :
            <div>
                <div>
                    <h3>Filters</h3>
                    <DropdownButton title="Category" list={payload.allCategories} filter={{query, setQuery}} />
                    <DropdownButton title="Provider" list={payload.allProvider} filter={{query, setQuery}} />
                    <DropdownButton title="Price" list={priceOptions} filter={{query, setQuery}} />
                </div>
                <div>
                    
                </div>
            </div>

            }
        </div>
    )
}

export default Products