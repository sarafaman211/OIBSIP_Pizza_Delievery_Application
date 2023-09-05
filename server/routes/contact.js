const express = require("express")
const contactCtrl = require("../controller/contactCtrl")
const route = express.Router()

route.get("/", contactCtrl.getContact)
route.post("/addContacts", contactCtrl.addContact)
route.delete("/deleteContacts/:id", contactCtrl.deleteContact)

module.exports = route