const express = require("express")
const productCtrl = require("../controller/productCtrl")
const route = express.Router()

route.get("/", productCtrl.getProducts)
route.get("/:id", productCtrl.productById)

module.exports = route