require('dotenv').config()
const express = require('express')
const app = require('express')();
const cookieParser = require("cookie-parser")

const CallBackRouter = require("./routes/callback.js")
const ConfigRouter = require("./routes/protect.js")
const LoginRouter = require("./routes/login.js")
const WhiteListRouter = require("./routes/noprotect.js") ;
const LogoutRouter = require("./routes/logout") ;


app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.json())

app.use(LoginRouter)
app.use(LogoutRouter)
app.use(ConfigRouter)
app.use(CallBackRouter)
app.use(WhiteListRouter)

app.listen(process.env.PORT || 3000, () => console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`))