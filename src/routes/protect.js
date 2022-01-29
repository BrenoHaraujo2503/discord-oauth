const router = require('express').Router();
const axios = require('axios');

const ROLE_ID = process.env.ROLE_ID
const GUILD_ID = process.env.GUILD_ID

router.get("/protect", async (req, res) => {
  if(!req.cookies.discord_auth_token) return res.redirect("/")

  try {
    response = await axios({
      url: `https://discordapp.com/api/v9/users/@me/guilds/${GUILD_ID}/member`,
      method: "GET",
      headers: {'Authorization': `Bearer ${req.cookies.discord_auth_token}`}
    })
  } catch(err) {
    console.log(err.response.data)
    return res.send("Ocorreu um erro")
  }
  const data = response.data;;
  
  if(data.roles.includes(ROLE_ID)) {
    return res.render("protect.ejs", { user: data.user })
  }
  return res.redirect("/noprotect")
})

module.exports = router;