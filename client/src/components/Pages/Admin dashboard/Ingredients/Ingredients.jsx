import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import pizzaContext from '../../../../context/pizzaContext';
import Spinner from '../../../Utils/Spinner';
import {BiMailSend} from "react-icons/bi"
import toast, { Toaster } from "react-hot-toast"

const Ingredients = () => {
  const { ingredient, getIngredients } = useContext(pizzaContext)

  const sendStock = async () => {
    await fetch("http://localhost:5000/api/ingredient/checkStocks",{
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    toast.success("Email sent !!!!", {
      duration: 3000,
      position: "top-right"
    })
  }

  useEffect(() => {
    getIngredients()
    // console.log(ingredient)
  }, [getIngredients,ingredient])

  if (ingredient === null || ingredient === undefined) {
    return <Spinner />;
}


  return (
    <section className="orderDetails">

      <main>
        <h1>Stock Details</h1>
        <p style={{ textAlign: "center", color: "grey" }}>
          Note: You will receive emails for stock updates every 6 hours or when the stock is low.
        </p>
        <div className="row">

          <div className="col-md-6 g-4">
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title my-3">{ingredient.categoryQuantities[0].name}</h5>
                <div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[0].ingredients[0].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[0].ingredients[0].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2" >
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[0].ingredients[1].name}</h5>
                    <p className="card-text">Quantity {ingredient.categoryQuantities[0].ingredients[1].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[0].ingredients[2].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[0].ingredients[2].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[0].ingredients[3].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[0].ingredients[3].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[0].ingredients[4].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[0].ingredients[4].quantity}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <strong className="card-subtitle text-body-secondary">Total</strong>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[0].quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-6 g-4">
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title my-3">{ingredient.categoryQuantities[1].name}</h5>
                <div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[1].ingredients[0].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].ingredients[0].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[1].ingredients[1].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].ingredients[1].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[1].ingredients[2].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].ingredients[2].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[1].ingredients[3].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].ingredients[3].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[1].ingredients[4].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].ingredients[4].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[1].ingredients[5].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].ingredients[5].quantity}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <strong className="card-subtitle text-body-secondary">Total</strong>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[1].quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 g-4">
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title my-3">{ingredient.categoryQuantities[2].name}</h5>
                <div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[0].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[0].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[1].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[1].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[2].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[2].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[3].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[3].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[4].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[4].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[5].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[5].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[6].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[6].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[2].ingredients[7].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].ingredients[7].quantity}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <strong className="card-subtitle text-body-secondary">Total</strong>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[2].quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 g-4">
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h4 className="card-title my-3">{ingredient.categoryQuantities[3].name}</h4>
                <div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[0].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[0].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[1].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[1].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[2].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[2].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[3].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[3].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[4].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[4].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[5].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[5].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[6].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[6].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[7].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[7].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[8].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[8].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[9].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[9].quantity}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <h5 className="card-subtitle text-body-secondary">{ingredient.categoryQuantities[3].ingredients[10].name}</h5>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].ingredients[10].quantity}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center my-2">
                    <strong className="card-subtitle text-body-secondary">Total</strong>
                    <p className="card-text"> Quantity {ingredient.categoryQuantities[3].quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <article>
          <h1>Ingredients</h1>
          <div>
            <div>
              <h4 style={{ fontWeight: 800 }}>Sub Totals</h4>
              <div></div>
              <div style={{ fontWeight: 800 }}>Ingredients: {ingredient.totalItems}</div>
              <Link className= "btn" style={{ fontWeight: "bold", color: "#bf8d3c" }} to="/admin/addIngredients">Add stocks</Link>
              <BiMailSend onClick={sendStock} style={{ color: "#bf8d3c", fontSize: "2rem", cursor: "pointer" }} />
            </div>
          </div>
        </article>
        <Toaster />
      </main>
    </section >
  )
}

export default Ingredients