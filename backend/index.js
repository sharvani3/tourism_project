const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT
const express = require('express');
const app = express();
const authRoute = require("./routes/auth.route")



app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))


app.use('/api/auth',authRoute)

mongoose.connect(process.env.MONGODBURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('mongo connected')).catch(err=>console.log('error',err))
app.get('/',(req,res)=>{res.json('server is ready')});

app.listen(PORT,()=>console.log('server is running on 7800'));