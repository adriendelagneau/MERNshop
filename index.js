const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const path = require('path');
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const productRoutes = require("./routes/productRoutes")
const stripeRoutes = require("./routes/stripeRoutes")
const newsLetterRoutes = require('./routes/newsLetterRoutes')
const orderNumberRoutes = require('./routes/orderNumberRoutes')

//var serveStatic = require('serve-static')

require('dotenv').config();
require("./config/db")
const app = express()


//app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }))



app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));// 
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/products", productRoutes)
app.use("/api/checkout", stripeRoutes)
app.use('/api/newsletter', newsLetterRoutes)
app.use("/api/orderNumber", orderNumberRoutes)


app.use(express.static(path.join(__dirname, "/client")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, (err) => {
  if (!err) console.log("Server started")
  else console.log("Error to connect server : " +err)
})