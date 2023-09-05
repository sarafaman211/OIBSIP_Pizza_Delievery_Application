const express = require("express")
const route = express.Router()
const orderCtrl = require("../controller/orderCtrl")
const auth = require("../middleware/user.middleware")
const authAdmin =require("../middleware/admin.middlware")

route.get('/', orderCtrl.getOrders)
route.post('/placeOrder', auth, orderCtrl.placeOrder)
route.get("/order/:id", auth, orderCtrl.getOrderDetails);
route.post("/createorderonline", auth, orderCtrl.placeOrderOnline);
route.post("/paymentverification", auth, orderCtrl.paymentVerification);

// Admin section
route.get("/admin/orders", auth, authAdmin, orderCtrl.getAdminOrders);
route.get("/admin/stats/:id", auth, authAdmin, orderCtrl.processOrder);



module.exports = route