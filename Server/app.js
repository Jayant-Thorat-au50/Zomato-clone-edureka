const express = require('express');
const AppRoutes = require("./Routes/AppRoutes");
const cors = require('cors');
const cookieParser = require('cookie-parser')


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', AppRoutes);
app.use(cookieParser())


const mongoose = require("mongoose");
const mongoDb_URI = "mongodb://127.0.0.1:27017/user"
mongoose
  .connect(mongoDb_URI)
  .then(() => app.listen(3056, () => console.log('server is listing to the port')))
  .catch(() => console.log("db not connected"));
