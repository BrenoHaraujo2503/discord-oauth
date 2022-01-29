const router = require('express').Router();

const axios = require('axios');
const { URLSearchParams } = require("url")

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL

router.get("/callback", async (req, res) => {
  if(!req.query.code) return res.redirect("/")

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', req.query.code);
  params.append('redirect_uri', CALLBACK_URL);

  let response;
  try {
    response = await axios({
      url: "https://discordapp.com/api/oauth2/token",
      method: "POST",
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    })
  } catch(err) {
    console.log(err.response.data)
    return res.send("Ocorreu um erro")
  }

  const data = await response.data;

  res.cookie("discord_auth_token", data.access_token, { maxAge: data.expires_in })

  return res.redirect(`/protect`)
})

module.exports = router