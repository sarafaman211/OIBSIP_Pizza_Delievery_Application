import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

import Home from "./components/Pages/Home"
import About from "./components/Pages/About"
import Pizza from "./components/Pages/Pizza"
import Contact from "./components/Pages/Contact"

import Cart from "./components/Pages/Cart/Cart"
import Shipping from "./components/Pages/Cart/Shipping"
import ConfirmOrder from "./components/Pages/Cart/ConfirmOrder"
import PaymentSuccess from "./components/Pages/Cart/PaymentSuccess"

import MyOrders from "./components/Pages/User dashboard/MyOrders"
import OrderDetails from "./components/Pages/User dashboard/OrderDetails";
import Custom from "./components/Pages/User dashboard/Custom";

import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup";
import ActivationEmail from "./components/Auth/Activation_Email"
import ForgotPassword from "./components/Auth/Forogt_Password";
import ResetPassword from "./components/Auth/Reset_Password"

import ScrollToTop from "./components/Utils/scrollToTop"
import Spinner from "./components/Utils/Spinner"

import Users from "./components/Pages/Admin dashboard/Users";
import Dashboard from "./components/Pages/Admin dashboard/Dashboard";
import Orders from "./components/Pages/Admin dashboard/Orders";
import AdminContact from "./components/Pages/Admin dashboard/Contact";
import UpdateRole from "./components/Pages/Admin dashboard/Update_role";
import Ingredients from "./components/Pages/Admin dashboard/Ingredients/Ingredients";
import AddIngredients from "./components/Pages/Admin dashboard/Ingredients/AddIngredients";

import PizzaState from "./context/pizzaState"
import Error from "./components/Utils/Error";

function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    setLoading(true)

    setTimeout(() => {

      setLoading(false)

    }, 3000);
  }, [])

  return (
    <>
      <Router>
        <PizzaState>

          <ScrollToTop />
          {loading && <Spinner />}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/pizza" element={<Pizza />} />
            <Route exact path="/customPizza" element={<Custom />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />

            <Route exact path="/orders" element={<MyOrders />} />
            <Route exact path="/orderDetails/:id" element={<OrderDetails />} />

            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/confirmOrder" element={<ConfirmOrder />} />
            <Route exact path="/paymentSuccess" element={<PaymentSuccess />} />


            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/users" element={<Users />} />
            <Route exact path="/admin/orders" element={<Orders />} />
            <Route exact path="/admin/contactData" element={<AdminContact />} />
            <Route exact path="/admin/updateRole/:id" element={<UpdateRole />} />
            <Route exact path="/admin/ingredients" element={<Ingredients />} />
            <Route exact path="/admin/addIngredients" element={<AddIngredients />} />



            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/verification/:authToken" element={<ActivationEmail />} />
            <Route exact path="/reset/:authToken" element={<ResetPassword />} />
            <Route exact path="/forgot" element={<ForgotPassword />} />

            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </PizzaState>
      </Router>
    </>
  );
}

export default App;
