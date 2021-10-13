import express from "express";
import {
    createServer
} from "http";

import {
    Server
} from "socket.io";
const 요청키 = process.env.API_KEY;
import fetch from "node-fetch";
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    /* options */
});
io.on("connection", (socket) => {
    socket.on("korean", async (data, 독어집어넣기) => {
        console.log(data)
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${요청키}`, {
            method: "POST",
            body: JSON.stringify({
                "q": data,
                "target": "de",
            })
        })
        const 번역 = await response.json();
        const 독어번역 = 번역["data"]["translations"][0]["translatedText"]
        독어집어넣기(독어번역)
    });

})

const port = process.env.PORT || 5000
import dotenv from 'dotenv';
app.use("/static", express.static("assets"));

dotenv.config()
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => res.render("index"))
app.get('/*', (req, res) => res.redirect("index"))

const handleServer = console.log("연결되었음👀💜")
httpServer.listen(port, handleServer)