require('dotenv').config();

//express
const express = require('express')
const routes = require('./routes');

//sequelize
const { conn } = require("./db");

//others
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    credentials: true, // allow session cookie from browser to pass through
  })
);
server.use('/',routes);

const force = false;
conn.sync({ force })
.then(() => {
    server.listen(process.env.PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${process.env.PORT}`)
    })
})

