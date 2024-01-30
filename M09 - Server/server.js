const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require("cors");
const socketIO = require('socket.io');
//const { spawn } = require('child_process');
//const path = require('path');
var session = require('express-session')
const PORT = 3788;
const http = require('http');
const httpServer = http.createServer(app);


const io = socketIO(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    }
}));

app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


httpServer.listen(PORT, () => {
    console.log("Server => " + PORT);
});
