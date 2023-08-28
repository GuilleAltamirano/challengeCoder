import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export const BtBuyProdComponent = ({pid, cid, updateCart}) => {
    const addProdInCart = async () => {
        const qty = document.getElementById(pid).textContent
        
        const add = await addProdInCartFetch({pid, cid})
        if (add !== 'success') return console.log(data)

        const updateQty = await upQtyProdInCart({pid, cid, qty})
        updateCart.setUpCart(updateCart.upCart += 1 )
    }

    return (
        <button onClick={addProdInCart}>Add</button>
    )
}

export const BtLoginToBuy = () => {
    const navigate = useNavigate ()
    const loginToBuy = () => {
        return navigate ('/login')
    }
    return (
        <button onClick={loginToBuy}>Login to buy</button>
    )
}