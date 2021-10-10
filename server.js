const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const dotenv = require('dotenv')
dotenv.config()
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => res.render("index", {
    API_KEY: process.env.API_KEY
}))
app.use("/static", express.static("assets"));
app.listen(port, () => console.log(`Example app listening on port port!`))