import React from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector } from "react-redux";
const CartItems = () => {
  const cartItems = useSelector(state=>state.cart.itemsList)
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
          {
            cartItems.map((item) =>(
       
                    <CartItem 
                    id={item.id}
                    quantity={item.quantity} 
              price={item.price} 
              name={item.name}
              total={item.totalPrice} />
         
            ))
        }
      </ul>
    </div>
  );
};

export default CartItems;
