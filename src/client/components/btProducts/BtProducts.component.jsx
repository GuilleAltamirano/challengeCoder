import { useContext, useState } from 'react'
import style from './BtProducts.module.sass'

export const QtyProdComponent = ({stock}) => {
    const [qty, setQty] = useState(1)
    
    const decQty = () => {
        if (qty <= 1) return
        setQty(qty - 1)
    }

    const incQty = () => {
        if (qty >= stock) return
        setQty(qty + 1)
    }

    return (
        <div className={style.container_qty}>
            <button disabled={qty <= 1} onClick={decQty}>-</button>
            <p>{qty}</p>
            <button disabled={qty >= stock} onClick={incQty}>+</button>
        </div>
    )
}
