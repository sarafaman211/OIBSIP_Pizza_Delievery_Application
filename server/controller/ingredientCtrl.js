const Ingredient = require('../model/Ingredients.model');
const mail = require("../utils/mail")
const schedule = require("node-schedule")

const ingredientCtrl = {
    getIngredients: async (req, res) => {
        try {
            const { search } = req.query;

            const filter = search ? { name: { $regex: search, $options: "i" } } : {};

            const ingredient = await Ingredient.find(filter);

            const categoryQuantities = {
                Base: { name: "Base", quantity: 0, ingredients: [] },
                Sauce: { name: "Sauce", quantity: 0, ingredients: [] },
                Cheese: { name: "Cheese", quantity: 0, ingredients: [] },
                Veggies: { name: "Veggies", quantity: 0, ingredients: [] }
            };

            ingredient.forEach(ingredient => {
                const category = ingredient.category;
                if (categoryQuantities.hasOwnProperty(category)) {
                    categoryQuantities[category].quantity += ingredient.stockQuantity;
                    categoryQuantities[category].ingredients.push({
                        name: ingredient.name,
                        quantity: ingredient.stockQuantity
                    });
                } else {
                    console.log(`Unknown category for ingredient ${ingredient.name}`);
                }
            });

            const categoryQuantitiesArray = Object.values(categoryQuantities);
            res.status(200).json({
                success: true,
                totalItems: ingredient.length,
                categoryQuantities: categoryQuantitiesArray,
                ingredient
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    addIngredient: async (req, res) => {
        try {
            const { name, category, stockQuantity, minimumStock } = req.body;

            // Create a new ingredient
            const newIngredient = new Ingredient({
                name,
                category,
                stockQuantity,
                minimumStock,
            });

            // Save the new ingredient to the database
            const savedIngredient = await newIngredient.save();

            res.status(201).json({ sucess: true, message: 'Ingredient added successfully', addedIngredient: savedIngredient });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while adding an ingredient', error: error.message });
        }
    },
    addIngredients: async (req, res) => {
        try {
            const { ingredients } = req.body;

            const addedIngredients = [];

            for (const ingredientData of ingredients) {
                const { name, category, stockQuantity, minimumStock } = ingredientData;
                // console.log( name, category, stockQuantity, minimumStock)
                const newIngredient = new Ingredient({
                    name,
                    category,
                    stockQuantity,
                    minimumStock,
                });

                // Save the new ingredient to the database
                const savedIngredient = await newIngredient.save();
                addedIngredients.push(savedIngredient);
            }

            res.status(201).json({ message: 'Ingredients added successfully', addedIngredients });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while adding ingredients', error: error.message });
        }
    },
    updateIngredient: async (req, res) => {
        try {
            const ingredientId = req.params.id;
            const { stockQuantity } = req.body;

            if (!stockQuantity || isNaN(stockQuantity)) {
                return res.status(400).json({ success: false, message: "Stock quantity must be a valid number" });
            }

            const updatedIngredient = await Ingredient.findByIdAndUpdate(
                ingredientId,
                { $set: { stockQuantity } },
                { new: true }
            );

            if (!updatedIngredient) {
                return res.status(404).json({ success: false, message: "Ingredient not found" });
            }

            res.status(200).json({ success: true, message: "Stock quantity updated", ingredient: updatedIngredient });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    checkStocks: async (req, res) => {
        try {
            const ingredientQuantity = await Ingredient.find({});


            if (ingredientQuantity.length === 0) {
                return res.status(404).json({ message: 'No ingredients found' });
            }

            if (ingredientQuantity.some(ingredient => ingredient.stockQuantity <= 15)) {
                const subject = '🚨 Low Ingredient Alert 🚨';
                const message = `
                    <h2>Attention: Ingredients are running low!</h2>
                    <p>Please take necessary actions to restock.</p>
                    <h2>Ingredient Details:</h2>
                    <table style="border-collapse: collapse; width: 100%;">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Stock Quantity</th>
                                <th>Minimum Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ingredientQuantity.map(ingredient => `
                                <tr>
                                    <td>${ingredient.name}</td>
                                    <td>${ingredient.category}</td>
                                    <td>${ingredient.stockQuantity}</td>
                                    <td>${ingredient.minimumStock}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                await mail(subject, message);
            } else {
                const subject = 'Ingredient Stock Status';
                const quantity = ingredientQuantity.length;
                const message = ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;"><strong>Good news:</strong> Ingredients are fully stocked!</h2>            
                <strong style="display: block; text-align: center; color: #333;">${quantity} ingredients</strong>
            </div>`

                await mail(subject, message);
            }

            res.status(200).json({ message: 'Stock check completed', ingredientQuantity });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

const scheduleRule = '0 */6 * * *';
schedule.scheduleJob(scheduleRule, () => {
    ingredientCtrl.checkStocks()
});

module.exports = ingredientCtrl;
