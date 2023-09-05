import React from 'react'
import cook from "../../config/custom_pizza.jpg"
import { BsFillTrashFill } from "react-icons/bs"

const CustomCartItems = ({ pizza, increment, decrement, remove, isCustomPizza }) => {
    return (
        <div className="cartItem">
            <div className="item-info">
                {isCustomPizza && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p>Base: {pizza.base}</p>
                        <p>Sauce: {pizza.sauce}</p>
                        <p>Cheese: {pizza.cheese}</p>
                        <p>Veggies: {pizza.veggies.join(', ')}</p>
                    </div>
                )}
                <img className='px-3' src={cook} alt="Item" />
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

export default CustomCartItems