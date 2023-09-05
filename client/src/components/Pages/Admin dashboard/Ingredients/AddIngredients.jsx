import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const AddIngredients = () => {
  const [ingredientData, setIngredientData] = useState({
    name: '',
    category: '',
    stockQuantity: '',
    minimumStock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredientData({
      ...ingredientData,
      [name]: value,
    });
  };

  const addIngredients = async ({ name, category, stockQuantity, minimumStock }) => {
   await fetch("http://localhost:5000/api/ingredient/addIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ name, category, stockQuantity, minimumStock })
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addIngredients(ingredientData)
    toast.success("Stock updated", {
      duration: 3000,
      position: "top-right"
    })
    setIngredientData({
      name: '',
      category: '',
      stockQuantity: '',
      minimumStock: '',
    });
  };

  const nameOptions = [
    { name: 'Stuffed Crust', category: 'Base' },
    { name: 'Cracker Crust', category: 'Base' },
    { name: 'Flat Bread Crust', category: 'Base' },
    { name: 'Thin Crust', category: 'Base' },
    { name: 'Cheese Crust Pizza', category: 'Base' },
    { name: 'Pesto', category: 'Sauce' },
    { name: 'White Garlic Sauce', category: 'Sauce' },
    { name: 'Garlic Ranch Sauce', category: 'Sauce' },
    { name: 'Hummus', category: 'Sauce' },
    { name: 'Buffalo Sauce', category: 'Sauce' },
    { name: 'Marinara Sauce', category: 'Sauce' },
    { name: 'Mozzarella Cheese', category: 'Cheese' },
    { name: 'Provolone Cheese', category: 'Cheese' },
    { name: 'Cheddar Cheese', category: 'Cheese' },
    { name: 'Parmesan Cheese', category: 'Cheese' },
    { name: 'Gouda', category: 'Cheese' },
    { name: 'Goat Cheese', category: 'Cheese' },
    { name: 'Gruyere', category: 'Cheese' },
    { name: 'Ricotta', category: 'Cheese' },
    { name: 'Fresh Tomatoes', category: 'Veggies' },
    { name: 'Peppers', category: 'Veggies' },
    { name: 'Zucchini', category: 'Veggies' },
    { name: 'Zucchini Flowers', category: 'Veggies' },
    { name: 'Eggplants', category: 'Veggies' },
    { name: 'Mushrooms', category: 'Veggies' },
    { name: 'Artichokes', category: 'Veggies' },
    { name: 'Onion', category: 'Veggies' },
    { name: 'Broccoli Rabe', category: 'Veggies' },
    { name: 'Potatoes', category: 'Veggies' },
    { name: 'Radicchio', category: 'Veggies' },
  ];


  const categoryOptions = [
    'Base',
    'Sauce',
    'Cheese',
    'Veggies',
  ];

  return (
    <section style={{ paddingTop: "4rem" }}>
      <div className="add-ingredient-form" style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center" }}>Add New Ingredient</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <br />
            <select
              name="name"
              value={ingredientData.name}
              onChange={handleChange}
            >
              <option value="">Select Name</option>
              {nameOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}, ({option.category})
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Category:
            <br />
            <select
              name="category"
              value={ingredientData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className="form-label">
            Stock Quantity:
            <input
              type="number"
              name="stockQuantity"
              value={ingredientData.stockQuantity}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Minimum Stock:
            <input
              type="number"
              name="minimumStock"
              value={ingredientData.minimumStock}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <button type="submit" className="submit-button">Add Ingredient</button>
        </form>
        <Toaster />
      </div>
    </section>
  )
}

export default AddIngredients