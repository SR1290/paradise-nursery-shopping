import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", price: 15, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200" },
        { name: "Spider Plant", price: 12, image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=200" },
        { name: "Peace Lily", price: 18, image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=200" },
        { name: "Boston Fern", price: 14, image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=200" },
        { name: "Aloe Vera", price: 10, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=200" },
        { name: "English Ivy", price: 16, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", price: 20, image: "https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?w=200" },
        { name: "Pothos", price: 11, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=200" },
        { name: "Cast Iron Plant", price: 25, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200" },
        { name: "Jade Plant", price: 13, image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=200" },
        { name: "Chinese Evergreen", price: 19, image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=200" },
        { name: "Succulent Mix", price: 9, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", price: 17, image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=200" },
        { name: "Rosemary", price: 14, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e2?w=200" },
        { name: "Mint", price: 8, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=200" },
        { name: "Basil", price: 7, image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?w=200" },
        { name: "Jasmine", price: 22, image: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=200" },
        { name: "Eucalyptus", price: 21, image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?w=200" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isItemInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <span onClick={() => setShowCart(false)}>Home / Plants</span>
        <span onClick={() => setShowCart(true)} style={{cursor: 'pointer'}}>
          🛒 Cart ({totalItems})
        </span>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-listing">
          {plantsArray.map((sec, index) => (
            <div key={index}>
              <h2>{sec.category}</h2>
              <div className="product-grid">
                {sec.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.price}</p>
                    <button 
                      className={isItemInCart(plant.name) ? "disabled-btn" : ""}
                      disabled={isItemInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isItemInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
