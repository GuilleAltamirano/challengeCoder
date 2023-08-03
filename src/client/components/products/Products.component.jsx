import { useState } from 'react'
import style from './ProductsComponent.module.sass'
import { QtyProdComponent } from '../btProducts/BtProducts.component'

export const ProductsComponent = ({docs, user}) => {

    return (
    <>
        <ul>
            <li>Image</li>
            <li>Title</li>
            <li>Description</li>
            <li style={user && user.role === 'USER' ? '' : { cursor: 'pointer' }}>Price v</li>
            <li>Stock</li>
            <li>Qty</li>
        </ul>
        { docs.length > 0 ?
            <div>
                {docs.map(prod => (
                <div key={prod._id} className={style.products_container}>
                    <div className={style.img_container}><img src={prod.thumbnails[0]} alt={`Image ${prod.title}`} /></div>
                    <h3>{prod.title.toLowerCase()}</h3>
                    <p>{prod.description.toLowerCase()}</p>
                    <p>${prod.prices.list_three}</p>
                    <p>{prod.stock}</p>
                    <QtyProdComponent stock={prod.stock} />
                </div>
                ))}
            </div>
                :
            <h3>No hay products</h3>
        }
    </>
    )
}