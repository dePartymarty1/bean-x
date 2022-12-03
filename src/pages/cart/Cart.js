import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' // when we want to fetch a product from redux store we use this
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice'
import styles from "./Cart.module.scss"
import { FaTrashAlt } from "react-icons/fa"
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'

const Cart = () => {
  const cartItems = useSelector(selectCartItems) // selecting from imports in cartSlice
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [dispatch, cartItems]) // dependency to fire off every time cartitems changes

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Cart Empty.</p>
            <br />
            <div>
              <Link to="/#products" style={{color: "black"}}>Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const {id, name, price, imageURL, cartQuantity} = cart
                return (
                  <tr key={id}>
                    {/* <td>{index + 1}</td> */}
                    <td><p><b>{name}</b></p><img src={imageURL} alt={name} style={{width: "200px"}} /></td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button className="--btn" onClick={() => decreaseCart(cart)}>-</button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button className="--btn" onClick={() => increaseCart(cart)}>+</button>
                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            {/* <button className="--btn --btn-danger">Clear Cart</button> */}
            <div className={styles.checkout}>
              {/* <div>
                <Link to="/#products">&larr; Continue Shopping</Link>
              </div> */}
              {/* <br /> */}
              <Card cardClass={styles.card}>
                <p>{`Cart Item(s)`}</p>
                <div className={styles.text}>
                  <h4>Subtotal:</h4>
                  <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                </div>
                <button className="--btn --btn-primary --btn-block">Checkout</button>
              </Card>
            </div>
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart
