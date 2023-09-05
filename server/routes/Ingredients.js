const express = require("express")
const ingredientCtrl = require("../controller/ingredientCtrl")
const auth = require("../middleware/user.middleware")
const authAdmin =require("../middleware/admin.middlware")
const route = express.Router()

route.get("/getIngredients", auth, authAdmin, ingredientCtrl.getIngredients)
route.get("/checkStocks", auth, authAdmin,ingredientCtrl.checkStocks)
route.post("/addIngredients", auth, authAdmin,ingredientCtrl.addIngredients)
route.post("/addIngredient", auth, authAdmin,ingredientCtrl.addIngredient)
route.put("/updateIngredients/:id", auth, authAdmin,ingredientCtrl.updateIngredient)

module.exports = route
