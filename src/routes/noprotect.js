const router = require('express').Router();
const axios = require('axios')

router.get("/noprotect", async (req, res) => {
  if(!req.cookies.discord_auth_token) return res.redirect("/")
  
  let response;
  try {
    response = await axios({
      url: "https://discordapp.com/api/v9/users/@me",
      method: "GET",
      headers: {'Authorization': `Bearer ${req.cookies.discord_auth_token}`}
    })
  } catch {
    return res.send("Ocorreu um erro")
  }

  const data = response.data

  res.render("protect.ejs", { user: data })
})

module.exports = router