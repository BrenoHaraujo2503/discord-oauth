const router = require('express').Router();

const CLIENT_ID = process.env.CLIENT_ID
const CALLBACK_URL = process.env.CALLBACK_URL

router.get("/", (req, res) => {
  if(req.cookies.discord_auth_token) return res.redirect("/config")
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&response_type=code&scope=identify%20guilds%20guilds.members.read`

  res.render("index.ejs", { url, mensagem: null })
})

module.exports = router;