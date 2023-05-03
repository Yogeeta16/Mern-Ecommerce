import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB  from "./config/db.js";
import authRoute from './routes/authRoute.js';

  
//configure env
dotenv.config();

//database ko configr karenge 
connectDB();

// rest objects creae krenge 

const app = express()

//middleware -morgan ko configr correnge 
app.use(express.json())
app.use(morgan('dev'))


///routes 
app.use('/api/v1/auth',authRoute);


// rest api create kr skte h 

app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>");
        //json messege send kr re h 
        //message : 'Welcome to app'
    
});
// react ka port 3000 pr kaam krta h 
//angular ka 4200
//node ka 8080 /8000 

//port denge
const PORT =process.env.PORT || 8080;

//app ko run / listen  krenge 

app.listen(PORT,() =>{
    console.log('server running on ${PORT}');
});

