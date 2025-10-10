import { Router } from "express";

const routerMain = Router()

// Request tipo GET 
// Con parametros optionales por medio de query (?type=SOMETHING&rating=SOMETHING)
routerMain.get('/restaurant', (req, res) => {
    const {type, rating} = req.query
    res.send("Hello world")
    console.log(type, rating)
})

// Request tipo GET 
// Con parametros obligatorios por medio de ruta (params)
routerMain.get('/restaurant/:type/:rating', (req, res) => {
    const {type, rating} = req.params
    if (type == "pizza") {
        if (rating > 3) 
            res.send("Little Ceaser")
        else res.send("Pizza Hut")
    }
    else if (type == "coffee")
        res.send("Starbucks")
    else
        res.send("Restaurant not found")
})

// Request tipo POST
// pueden tener el mismo nombre de ruta pero no causa conflicto porque tienen diferente tipo de método de HTTP
//después de escribir el codigo del 31 al 34, te vas a Postman {
//  "name": "Little Ceaser",
//  "rating": 100000
//}
routerMain.post('/restaurant', (req, res) => {
    const body = req.body
    console.log(body);
    res.send("ok")
})

export default routerMain
