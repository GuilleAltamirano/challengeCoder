import { QtyProdComponent } from '../btProducts/BtProducts.component'
import style from './ProductsComponent.module.sass'

export const ProductsComponent = ({docs}) => {
    return (
    <div>
        <ul>
            <li>Image</li>
            <li>Title</li>
            <li>Description</li>
            <li>Price</li>
            <li>Stock</li>
            <li>Qty</li>
        </ul>
        {
            docs.map(prod => (
                <div key={prod._id} className={style.products_container}>
                    <div className={style.img_container}><img src={prod.thumbnails[0]} alt={`Image ${prod.title}`} /></div>
                    <h3>{prod.title}</h3>
                    <p>{prod.description}</p>
                    <p>${prod.price}</p>
                    <p>{prod.stock}</p>
                    <QtyProdComponent stock={prod.stock} />
                </div>
            ))
        }
    </div>
    )
}