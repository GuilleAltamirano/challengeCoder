import { useState } from 'react'
import style from './ProductsComponent.module.sass'
import { QtyProdComponent, BtBuyProdComponent } from '../btProducts/BtProducts.component'

export const ProductsComponent = ({docs, user}) => {
    const [typePrices, setTypePrices] = useState('list_three')
    const [modalPrice, setModalPrice] = useState(false)
    const arrayPrices = ['cost', 'list_one', 'list_two', 'list_three']

    const handleTypePrices = ({price}) => {
        setTypePrices(price)
        return setModalPrice(!modalPrice)
    }

    return (
        <>
            <ul>
                <li>Image</li>
                <li>Title</li>
                <li>Description</li>
                <li onClick={() => {setModalPrice(!modalPrice)}} style={user && user.role !== 'user' ? {cursor: 'pointer'} : ''}>
                    Price {modalPrice ? 'v' : '>'}
                </li>
                <li>Stock</li>
                <li>Qty</li>
            </ul>
            {!modalPrice ? '' : 
                <span>
                    <ul className={style.typesPrices}>
                        {arrayPrices.map((price, index) => (<li key={index} onClick={()=>{handleTypePrices({price})}}>{price}</li>))}
                    </ul>
                </span>
            }
            { docs.length > 0 ?
                <div>
                    {docs.map(prod => (
                    <div key={prod._id} className={style.products_container}>
                        <div className={style.img_container}><img src={prod.thumbnails[0]} alt={`Image ${prod.title}`} /></div>
                        <h3>{prod.title}</h3>
                        <p>{prod.description}</p>
                        <p>${prod.prices[typePrices]}</p>
                        <p>{prod.stock}</p>
                        <QtyProdComponent stock={prod.stock} pid={prod._id} quantity={1}/>
                        <BtBuyProdComponent pid={prod._id} cid={user.cart._id}/>
                    </div>
                    ))}
                </div>
                    :
                <h3>No hay products</h3>
            }
        </>
    )
}