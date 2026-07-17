import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleCheckout = () => {
    alert("Checkout functionality Coming Soon!");
  };

  return (
    <div className="cart-container">
      <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} style={{ width: '100px' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.price}</p>
              <p>Total Cost: ${item.price * item.quantity}</p>
              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onContinueShopping}>Continue Shopping</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default CartItem;
