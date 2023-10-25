import React, { useContext } from 'react'
import './styles.css'
import { CartContext } from '../../context/cart-context'
export const Cart = () => {

    const { cart, onAddToCart, onDrecreaseItem, onRemoveItem, total, getTotalQuantityItem } = useContext(CartContext)

    return (
        <>
            <div className="cartContainer">
                <h2>Cart</h2>
                {cart.length === 0 && <h2>Cart is empty</h2>}
                {
                    cart?.length > 0 && cart.map(product => (
                        <div key={product.id} className="cartItem">
                            <div className="cardImageContainer">
                                <img src={product.image} alt={product.name} className="cardImage" />
                            </div>

                            <div className="cartContentContainer">
                                <p className='cartProductName'> {product.name} </p>
                                <p className='cartPrice'>USD {product.price}</p>
                                <p className='cartQuantity'>Quantity: {product.quantity} </p>
                                <p className='cartStock'> {product.stock} left</p>
                                <div className="cartActions">
                                    <button onClick={() => onAddToCart(product.id)} className="cartButtonAdd">+</button>
                                    <button onClick={() => onDrecreaseItem(product.id)} className="cartButtonDecrease">-</button>
                                    <button onClick={() => onRemoveItem(product.id)} className="cartButtonRemove">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    cart?.length > 0 && (
                        <div className="cartDetailActions">
                            <p className='cartTotal'>Total: USD{total}</p>
                            <p className="getTotalQuantityItem">Total items: {getTotalQuantityItem()}</p>
                            <button className="cartButtonCheckout">Checkoout</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}
