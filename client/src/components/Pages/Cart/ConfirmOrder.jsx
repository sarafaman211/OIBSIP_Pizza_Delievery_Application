import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../styles/confirmOrder.scss";

const ConfirmOrder = () => {
  const location = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const checkoutData = JSON.parse(localStorage.getItem('checkoutData')) || {};
  const shippingData = JSON.parse(localStorage.getItem('shippingData')) || {};

  const razorpayKey = 'rzp_test_GJpQ8mQMuWzK4g'; // Replace with your actual Razorpay API key

  const amountInRupees = checkoutData.total; // This is 5 rupees

  // Convert rupees to paise (multiply by 100)
  const amountInPaise = amountInRupees * 100;

  // Ensure it's an integer
  const amountInPaiseInt = Math.round(amountInPaise);

  const handleOnlinePayment = async () => {
    // Make an API call to your server to create a Razorpay order
    const createOrderResponse = await fetch('http://localhost:5000/api/orders/createorderonline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(orderData), // Send your order data here
    });

    if (!createOrderResponse.ok) {
      console.error('Failed to create a Razorpay order.');
      return;
    }

    const orderDetails = await createOrderResponse.json();
    // console.log(orderDetails)

    const options = {
      key: razorpayKey,
      currency: 'INR', // Replace with your preferred currency
      amount: amountInPaiseInt, // Amount in paisa
      order_id: orderDetails.order.id,
      name: 'Pizza Wala',
      description: 'Payment for your order',
      image: 'http://localhost:5000/logo.svg',
      callback_url: "http://localhost:5000/api/orders/paymentverification",
      prefill: {
        name: "Aman saraf",
        email: "sarafaman211@gmail.com",
        contact: "9999999999"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#bf8d3c"
      }, // Replace with your logo URL
      handler: function (response) {
        // Handle successful payment here
        console.log('Payment success:', response);
        location('/paymentSuccess'); // Redirect to payment success page
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const orderData = {
    paymentMethod,
    customPizzaSubTotal: checkoutData.customPizzaSubTotal || 0,
    pizzas: [
      ...checkoutData.selectedPizzas.map((pizza) => ({
        isPredefined: true,
        predefinedPizza: {
          pizza: {
            name: pizza.name || '',
            category: pizza.category || '',
            image: pizza.image || '',
            description: pizza.description || '',
          },
        },
        quantity: pizza.quantity || 0,
      })),
      ...checkoutData.customPizzas.map((pizza) => ({
        isPredefined: false,
        customPizza: {
          pizza: {
            base: pizza.base || '',
            sauce: pizza.sauce || '',
            cheese: pizza.cheese || '',
            veggies: pizza.veggies || [],
          },
          price: pizza.price || 0,
        },
        quantity: pizza.quantity || 0,
      })),
    ],
    shippingCharges: checkoutData.shippingCharges || 0,
    itemsPrice: checkoutData.subTotal || 0,
    taxPrice: checkoutData.tax || 0,
    totalAmount: checkoutData.total || 0,
    shippingInfo: {
      phoneNo: shippingData.phoneNo || '',
      pinCode: shippingData.pincode || '',
      country: shippingData.country || '',
      state: shippingData.state || '',
      city: shippingData.city || '',
      hNo: shippingData.houseNo || '',
    },
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'COD') {
      const data = await fetch("http://localhost:5000/api/orders/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(orderData)
      });
      const res = await data.json();
      const token = localStorage.getItem("token");
      localStorage.clear();
      localStorage.setItem("token", token);
      console.log(res);
      location("/paymentSuccess");
    } else if (paymentMethod === 'Online') {

      handleOnlinePayment()
      console.log('Placing Online payment order...');
    } else {
      // Redirect or show confirmation message as needed
      location("/paymentSuccess");
    }
  };


  return (
    <section className="confirmOrder" style={{ marginTop: "4rem" }}>
      <main>
        <h1>Confirm Order</h1>

        <form>
          <div>
            <label>Cash On Delivery</label>
            <input
              value="CashOnDelivery"
              checked={paymentMethod === 'COD'}
              onChange={handlePaymentChange}
              type="radio"
              name="payment"
            />
          </div>
          <div>
            <label>Online</label>
            <input
              value="Online"
              checked={paymentMethod === 'Online'}
              onChange={handlePaymentChange}
              type="radio"
              name="payment"
            />
          </div>

          <button onClick={handlePlaceOrder} type="submit">Place Order</button>
        </form>
      </main>
    </section>
  );
};

export default ConfirmOrder;
