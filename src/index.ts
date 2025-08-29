import express from "express"
import bodyParser from "body-parser"
import { AppDataSource } from "./data-source.js"
import Routes  from "./routes.js"
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    app.use('/', Routes);

    
    app.listen(3000)
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
