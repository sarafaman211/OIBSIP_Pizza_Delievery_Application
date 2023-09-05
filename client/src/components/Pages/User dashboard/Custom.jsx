import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast"

const Custom = () => {
    const [selectedBase, setSelectedBase] = useState('');
    const [selectedSauce, setSelectedSauce] = useState('');
    const [selectedCheese, setSelectedCheese] = useState('');
    const [selectedVeggies, setSelectedVeggies] = useState([]);
    const customPrice = 500
    const baseOptions = ['Stuffed Crust', 'Cracker Crust', 'Flat Bread Crust', 'Thin Crust', 'Cheese Crust Pizza'];
    const sauceOptions = ['Pesto', 'White Garlic Sauce', 'Garlic Ranch Sauce', 'Hummus', 'Buffalo Sauce', 'Marinara Sauce'];
    const cheeseOptions = ['Mozzarella Cheese', 'Provolone Cheese', 'Cheddar Cheese', 'Parmesan Cheese', 'Gouda', 'Goat Cheese', 'Gruyere', 'Ricotta'];
    const veggiesOptions = [
        'Fresh Tomatoes', 'Peppers', 'Zucchini', 'Zucchini Flowers', 'Eggplants',
        'Mushrooms', 'Artichokes', 'Onion', 'Broccoli Rabe', 'Potatoes', 'Radicchio'
    ];

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create an object to represent the custom pizza with all selected options
        const customPizza = {
            base: selectedBase,
            sauce: selectedSauce,
            cheese: selectedCheese,
            veggies: selectedVeggies,
            price: customPrice
        };

        // Check if there are multiple veggies selected
        if (selectedVeggies.length > 1) {
            // Continue with adding to cart logic
            // ...
        } else {
            // Show an error message or handle the case where not enough veggies are selected
            console.error('Select at least 2 veggies.');
            toast.error('Select at least 2 veggies.', {
                duration: 3000,
                position: "top-right"
            });
            // Optionally, you can display an error message to the user.
            return;
        }

        // Retrieve existing custom pizzas from local storage or initialize as an empty array
        const existingCustomPizzas = JSON.parse(localStorage.getItem('customPizzas')) || [];

        // Add the new custom pizza to the array
        existingCustomPizzas.push(customPizza);

        // Update local storage with the updated custom pizza array
        localStorage.setItem('customPizzas', JSON.stringify(existingCustomPizzas));

        // Optional: Show a confirmation message
        console.log('Added custom pizza to cart:', customPizza);
        toast.success('Added custom pizza to cart:', {
            duration: 3000,
            position: "top-right"
        });
    };



    return (
        <section style={{ backgroundColor: "#bf8d3c", paddingTop: "4rem" }}>
            <div className="pizza-options row"  >
                <img src="https://www.crustys.com/wp-content/uploads/2019/01/make_your_own_pizza.jpg" style={{ borderRadius: "25px", marginBottom: "1rem" }} alt="link" />
                <h2 style={{ font: "100 3rem Roboto", textAlign: "center", marginBottom: "1.2rem" }}>Create Your Own Pizza</h2>
                <div className="option-group col-md-6 " >
                    <h4>Select Pizza Base</h4>
                    <ul>
                        {baseOptions.map((base, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    name="base"
                                    value={base}
                                    checked={selectedBase === base}
                                    onChange={() => setSelectedBase(base)}
                                />
                                {base}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="option-group col-md-6">
                    <h4>Select Sauce</h4>
                    <ul>
                        {sauceOptions.map((sauce, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    name="sauce"
                                    value={sauce}
                                    checked={selectedSauce === sauce}
                                    onChange={() => setSelectedSauce(sauce)}
                                />
                                {sauce}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="option-group col-md-6">
                    <h4>Select Cheese</h4>
                    <ul>
                        {cheeseOptions.map((cheese, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    name="cheese"
                                    value={cheese}
                                    checked={selectedCheese === cheese}
                                    onChange={() => setSelectedCheese(cheese)}
                                />
                                {cheese}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="option-group col-md-6">
                    <h4>Select Veggies</h4>
                    <ul>
                        {veggiesOptions.map((veggie, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    value={veggie}
                                    checked={selectedVeggies.includes(veggie)}
                                    onChange={() =>
                                        setSelectedVeggies((prevVeggies) =>
                                            prevVeggies.includes(veggie)
                                                ? prevVeggies.filter((v) => v !== veggie)
                                                : [...prevVeggies, veggie]
                                        )
                                    }
                                />
                                {veggie}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="price-input d-flex justify-content-between align-items-center">
                    <h4>Enter Price</h4>
                    <strong>₹500</strong>
                </div>

                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <Toaster />
        </section>
    );
};

export default Custom;
