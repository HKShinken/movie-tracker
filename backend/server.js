import path from 'path';

import express from 'express'
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './utils/connectDB.js'

//import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"
import filmRoutes from "./routes/filmRoutes.js"


dotenv.config(); //RICORDA CHE QUELLO CHE CAMBI A MANO SU ENV RICHIEDE IL RIAVVIO DEL SERVER ANCHE SE USI NODEMON

//dipendenze di solo sviluppo, non presenti in  prod
// npm i -D nodemon concurrently
// npm i -D  dotenv 
// npx create-react-app frontend

connectDB(); //connects to mongoDb

const app = express();
const port = process.env.PORT || 5000; //front end works on 3000

//Body parser middleware, needed to parse requests body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookie parser middleware
app.use(cookieParser());

//needed to serve static files, images
//app.use('/static', express.static(path.join(__dirname, 'public')))

/* ********************************** ROUTING ********************************** */
app.use("/api/users", userRoutes)
app.use("/api/film", filmRoutes)


//app.get('/', (req, res) => { res.send('hola!') })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// error handlers, routing acts as a waterfall
app.use(notFound)
app.use(errorHandler)