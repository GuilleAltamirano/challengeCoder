import { useEffect, useState } from "react"
import style from "./cartComponent.module.sass"
import { deleteAllProds, fetchCart, purchase } from "../../helper/cart.helper"
import { QtyProdComponent } from "../btProducts/BtProducts.component"

export const CartComponent = ({user, upCart}) => {
    const [cart, setCart] = useState([])

    const getCart = async () => {
        const dataCart = await fetchCart(user.cart._id)
        return setCart(dataCart.payload)
    }

    const delProdInCart = async ({pid, cid}) => {
        return await fetch(`/api/carts/${cid}/products/${pid}`, {method: 'DELETE'})
        .then(res => res.json()).then(data => {setCart(data.payload)})
    }

    useEffect(() => {
        getCart()
    }, [user, upCart])
    
    return !cart[0] ? <h4>No products</h4> :
    cart.map((prod, index) => (
        <div key={index} className={style.container_prod_cart}>
            <div className={style.div_one}>
                <img src={prod.product.thumbnails[0]} alt="Image product" />
                <h4>{prod.product.title}</h4>
                <button onClick={() => delProdInCart({pid: prod.product._id, cid: user.cart._id})}>X</button>
            </div>
            <span>{prod.product.description}</span>
            <div className={style.div_two}>
                <p>Stock: {prod.product.stock}</p>
                <QtyProdComponent stock={prod.product.stock} pid={index} quantity={prod.quantity}/>
                <p>Price: ${prod.product.prices.cost}</p>
            </div>
        </div>
    ))
}

export const BtDelProdsInCart = ({user}) => {
    const delAllProdsInCart = async (e) => {
        e.preventDefault()

        return deleteAllProds({cid: user.cart._id})
    }

    return(
        <button onClick={delAllProdsInCart}>Delete All</button>
    )
}

export const BuyProds = ({user, setUpCart}) => {
    const buyAllProds = async (e) => {
        e.preventDefault()
        const ticket = await purchase({cid: user.cart._id})
        return setUpCart(0)
    }

    return (
        <button onClick={buyAllProds}>Buy</button>
    )
}