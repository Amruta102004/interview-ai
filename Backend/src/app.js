//atekale046_db_user
//Amrutatekale
//mongodb+srv://atekale046_db_user:fc5qLA3vkgjyTNYe@interview-ai-cluster.qgd2bba.mongodb.net/interview-master

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

/* require all the routes here */
const authRouter = require("./routes/auth.routes");

/*using all the routes here */
app.use("/api/auth", authRouter);

module.exports = app;
