
//Import express
import express, {json} from 'express'
import { mongodbconnection } from './db/connection.js';
import routerMain from './routers/index.js';
import dotenv from 'dotenv'
dotenv.config()

//puerto
const PORT = process.env.PORT
const app = express()
app.use(json())

//inicio de ruta raíz
app.use('/api/v1', routerMain)

// mongodbconnection()

//abrir nuestro servidor (call back)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

