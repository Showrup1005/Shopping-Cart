require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const connectdb = require('./config/db')
const {errorHandler} = require('./middlewares/errorMiddleware')
connectdb()

app.use(express.json()) 
app.use(express.urlencoded({extended: false})) 

app.use('/api/carts', require('./routes/cartRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});