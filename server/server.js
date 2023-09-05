const express = require("express")
const db = require("./db")
const cors = require("cors")
const dotEnv = require("dotenv")
const cookieParser = require("cookie-parser")

dotEnv.config({ path: "./.env" })

const app = express()
const port =  process.env.PORT || 5000

// middlware 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

db()

app.use("/api", require("./routes/user"))
app.use("/api/orders", require("./routes/order"))
app.use("/api/ingredient", require("./routes/Ingredients"))
app.use("/api/contact", require("./routes/contact"))
app.use("/api/product", require("./routes/product"))

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.listen(port, () => {
    console.log(` Server connection successfully on port ${port } and in mode ${ process.env.NODE_ENV } `)
})