const Product = require('../model/Products.model');

const productCtrl = {
    getProducts: async (req,res) => {
        try {

            const product = await Product.find()
            res.json({ product })
            
        } catch (err) {
            res.status(500).json(err.message)
        }
    },
    productById: async (req,res) => {
        try {
            const { id } = req.params;

            const product = await Product.findById(id)
            res.json({ product })
            
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

module.exports = productCtrl