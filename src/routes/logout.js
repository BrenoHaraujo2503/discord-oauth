const router = require('express').Router();

router.get("/logout", (req, res) => {
  if(!req.cookies.discord_auth_token) return res.redirect("/")

  res.clearCookie("discord_auth_token")

  return res.redirect("/")
})

module.exports = router;