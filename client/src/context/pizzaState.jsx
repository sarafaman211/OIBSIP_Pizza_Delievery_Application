import React, { useEffect, useState } from "react";
import PizzaContext from "./pizzaContext"

const PizzaState = ({ children }) => {
  const [order, setOrder] = useState([])
  const [product, setProduct] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [stats, setStats] = useState(null)
  const [ingredient, setIngredient] = useState(null)
  const [users, setUsers] = useState(null)

  const orders = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const res = await data.json();
      // console.log(res.orders);
      setOrder(res.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const orderById = async (id) => {
    const data = await fetch(`http://localhost:5000/api/orders/order/${id}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    const res = await data.json()
    // console.log(res.order)
    setOrderId(res.order)
  }

  const adminStats = async () => {
    const data = await fetch("http://localhost:5000/api/admin/adminStats", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    const res = await data.json()
    // console.log(res)
    setStats(res)
  }


  const getPizza = async (req, res) => {
    const data = await fetch("http://localhost:5000/api/product", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })
    
    const response = await data.json()
    // console.log(response.product)
    setProduct(response.product)
  }

  const getIngredients = async (req, res) => {
    const data = await fetch("http://localhost:5000/api/ingredient/getIngredients", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    const response = await data.json()
    // console.log(response)
    setIngredient(response)
  }

  const getUser = async () => {
    const data = await fetch('http://localhost:5000/api/getUser', {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    const res = await data.json()
    // console.log(res.user)
    setUsers(res.user)
  }

  useEffect(() => {
   getUser()
  }, [])
  

  return (
    <PizzaContext.Provider value={{ orders, order, orderById, orderId, adminStats, stats, getPizza, product, ingredient,getIngredients, getUser, users }}>
      {children}
    </PizzaContext.Provider>
  )
}

export default PizzaState