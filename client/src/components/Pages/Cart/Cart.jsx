import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/cart.scss';
import CartItems from '../../Utils/CartItems';
import CustomCartItems from '../../Utils/CustomCartItems';

const Cart = () => {
  const [selectedPizzas, setSelectedPizzas] = useState([]); // Use an array to store selected pizzas
  const [customPizzas, setCustomPizzas] = useState([]); // Use an array to store custom pizzas

  useEffect(() => {
    // Get the selected pizzas from local storage
    const selectedPizzasFromLocalStorage = localStorage.getItem('selectedPizzas');
    // Get the custom pizzas from local storage
    const customPizzasFromLocalStorage = localStorage.getItem('customPizzas');
  
    // Parse the JSON strings to arrays of objects or initialize as empty arrays
    const parsedSelectedPizzas = JSON.parse(selectedPizzasFromLocalStorage) || [];
    let parsedCustomPizzas = JSON.parse(customPizzasFromLocalStorage) || [];
  
    // Add a default price of 500 to custom pizzas if there's no price provided
    parsedCustomPizzas = parsedCustomPizzas.map((pizza) => {
      if (!pizza.price) {
        pizza.price = '500'; // Set a default price of 500 if no price is provided
      }
      return pizza;
    });
  
    setSelectedPizzas(parsedSelectedPizzas);
    setCustomPizzas(parsedCustomPizzas);
  }, []);
  

  const increment = (index, isCustomPizza) => () => {
    // Increment the quantity for the specific pizza at the given index
    const updatedPizzas = isCustomPizza ? [...customPizzas] : [...selectedPizzas];
    updatedPizzas[index].quantity = (updatedPizzas[index].quantity || 0) + 1;
    if (isCustomPizza) {
      setCustomPizzas(updatedPizzas);
    } else {
      setSelectedPizzas(updatedPizzas);
    }
    updateLocalStorage(updatedPizzas, isCustomPizza);
  };

  const decrement = (index, isCustomPizza) => () => {
    // Decrement the quantity for the specific pizza at the given index, but ensure it doesn't go below 1
    const updatedPizzas = isCustomPizza ? [...customPizzas] : [...selectedPizzas];
    if (updatedPizzas[index].quantity > 1) {
      updatedPizzas[index].quantity -= 1;
      if (isCustomPizza) {
        setCustomPizzas(updatedPizzas);
      } else {
        setSelectedPizzas(updatedPizzas);
      }
      updateLocalStorage(updatedPizzas, isCustomPizza);
    }
  };

  const remove = (index, isCustomPizza) => () => {
    // Remove the pizza at the given index
    const updatedPizzas = isCustomPizza ? [...customPizzas] : [...selectedPizzas];
    updatedPizzas.splice(index, 1);
    if (isCustomPizza) {
      setCustomPizzas(updatedPizzas);
    } else {
      setSelectedPizzas(updatedPizzas);
    }
    updateLocalStorage(updatedPizzas, isCustomPizza);
  };

  const updateLocalStorage = (updatedPizzas, isCustomPizza) => {
    // Update local storage with the updated pizza data
    const localStorageKey = isCustomPizza ? 'customPizzas' : 'selectedPizzas';
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPizzas));
  };

  const calculateSubTotal = (pizzas) => {
    return pizzas.reduce((subtotal, pizza) => {
      const price = (pizza.prices && pizza.prices[0] && pizza.prices[0].small) || 0;
      return subtotal + price * (pizza.quantity || 0);
    }, 0);
  };
  
  const calculateTax = (pizzas) => {
    return pizzas.reduce((tax, pizza) => {
      const price = (pizza.prices && pizza.prices[0] && pizza.prices[0].small) || 0;
      return tax + price * 0.18 * (pizza.quantity || 0);
    }, 0);
  };

  const calculateCustomPizzaSubTotal = (customPizzas) => {
    return customPizzas.reduce((subtotal, pizza) => {
      const price = parseFloat(pizza.price) || 0;
      return subtotal + price * (pizza.quantity || 0);
    }, 0);
  };

  const calculateTotal = () => {
    const selectedPizzasTotal = calculateSubTotal(selectedPizzas) + calculateTax(selectedPizzas);
    const customPizzasTotal = calculateCustomPizzaSubTotal(customPizzas);

    return selectedPizzasTotal + customPizzasTotal + 200; // Calculate the total amount including shipping charges
  };

  const handleCheckout = () => {
    // Calculate the subtotal, tax, custom pizza subtotal, and total
    const subtotal = calculateSubTotal([...selectedPizzas, ...customPizzas]);
    const tax = calculateTax([...selectedPizzas, ...customPizzas]);
    const customPizzaSubTotal = calculateCustomPizzaSubTotal(customPizzas);
    const shippingCharges = 200; // Fixed shipping charges
  
    const total = subtotal + tax + customPizzaSubTotal + shippingCharges;
  
    // Create an object to store all the checkout data
    const checkoutData = {
      selectedPizzas,
      customPizzas,
      subtotal,
      tax,
      customPizzaSubTotal,
      shippingCharges,
      total,
    };
  
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
  };
  
  return (
    <section className="cart" style={{ marginTop: '4rem', marginBottom: "" }}>
      <main>
        {selectedPizzas.length === 0 && customPizzas.length === 0 ? ( // Check if there are no selected or custom pizzas
          <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }} className="empty-cart-message">
            Add pizzas to the cart
          </div>
        ) : (
          <>
            <h2>Selected Pizzas</h2>
            {selectedPizzas.map((pizza, index) => (
              <CartItems
                key={index}
                pizza={pizza}
                increment={increment(index, false)}
                decrement={decrement(index, false)}
                remove={remove(index, false)} // Pass remove function
              />
            ))}

            <h2>Custom Pizzas</h2>
            {customPizzas.map((pizza, index) => (
              <CustomCartItems
                key={index}
                pizza={pizza}
                increment={increment(index, true)}
                decrement={decrement(index, true)}
                remove={remove(index, true)}
                isCustomPizza={true} // Pass isCustomPizza prop
              />
            ))}
          </>
        )}
        <article>
          <div>
            <h4>Sub Total</h4>
            <p>₹{calculateSubTotal([...selectedPizzas, ...customPizzas])}</p>
          </div>
          <div>
            <h4>Tax</h4>
            <p>₹{calculateTax([...selectedPizzas, ...customPizzas]).toFixed()}</p>
          </div>
          <div>
            <h4>Custom Pizza Sub Total</h4>
            <p>₹{calculateCustomPizzaSubTotal(customPizzas)}</p>
          </div>
          <div>
            <h4>Shipping Charges</h4>
            <p>₹200</p>
          </div>
          <div>
            <h4>Total</h4>
            <p>₹{calculateTotal().toFixed()}</p>
          </div>
          <Link to="/shipping" style={{ textDecoration: 'none' }} onClick={handleCheckout}>
            Checkout
          </Link>
        </article>
      </main>
    </section>
  );
};

export default Cart;
