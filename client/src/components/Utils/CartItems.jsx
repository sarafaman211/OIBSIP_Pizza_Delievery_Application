import React from 'react'
import {BsFillTrashFill} from "react-icons/bs"
import cook from "../../config/custom_pizza.jpg"

const CartItems = ({ pizza, increment, decrement, remove }) => {
  return (
    <div className="cartItem">
    <div>
      <h4>{pizza.name}</h4>
      <img src={pizza.image? pizza.image : cook} alt="Item" />
    </div>

    <div>
      <button onClick={decrement}>-</button>
      <input type="number" readOnly value={pizza.quantity || 0} />
      <button onClick={increment}>+</button>
    </div>
    <button className='btn btn-danger' onClick={remove}><BsFillTrashFill /></button>
  </div>
  )
}

export default CartItems