import connectToMongo from './Config/db.js';
import express from 'express';
import dotenv from 'dotenv'
import UserRoute from './Routes/UserRoute.js'

// configure env
dotenv.config();

connectToMongo()

const app = express()

const port = process.env.PORT || 5000;
 
app.use(express.json())  

// available routes..
app.use('/api/auth', UserRoute)


app.listen(port, () => {
    console.log(`Ajio backend is running at localhost:${port}`);
})
