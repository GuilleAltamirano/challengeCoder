import { useState } from 'react'
import style from './BtProducts.module.sass'
import { addProdInCartFetch, upQtyProdInCart } from '../../helper/cart.helper'

export const QtyProdComponent = ({stock, pid, quantity}) => {
    const [qty, setQty] = useState(quantity)
    
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
            <button disabled={qty >= stock} onClick={incQty}>+</button>
            <p id={pid}>{qty}</p>
            <button disabled={qty <= 1} onClick={decQty}>-</button>
        </div>
    )
}

export const BtBuyProdComponent = ({pid, cid}) => {
    const addProdInCart = async () => {
        const qty = document.getElementById(pid).textContent
        
        const add = await addProdInCartFetch({pid, cid})
        if (add !== 'success') return console.log(data)

        const updateQty = await upQtyProdInCart({pid, cid, qty})
        
    }

    return (
        <button onClick={addProdInCart}>Add</button>
    )
}
