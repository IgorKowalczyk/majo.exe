const express = require('express')
// post params
const router = require('express').Router();
const { clientId, clientSecret, scopes, redirectUri } = require('../../config');
const fetch = require('node-fetch');
const FormData = require('form-data');
const {userhit,manageguild,checkguild,modifyguild} = require("../bot/webapi_handler.js");
let id,guildobj,mutualguilds,webuser;
// define the home page route
// middleware that is specific to this router
router.get('/', function (req, res) {
  if (!req.session.user) return res.redirect("/authorize")
  res_user = req.session.user
  res_guild = req.session.guilds
  returnobj = checkguild(res_user.id,res_guild)
  mutualguilds = returnobj.bot_guilds
  inviteguilds = returnobj.invitebot_guilds
  res.render("serverinfo",{pageTitle:"Manage Guilds",mutualguilds:mutualguilds,inviteguilds:inviteguilds,user:req.session.user});
})
// define the guild id route

router.get('/:id',(req,res)=>{
  if (!req.session.user) return res.redirect("/authorize")
  id = req.params["id"]
  guildobj = manageguild(id)
  res.render("serverpage",{user:req.session.user,count:guildobj.memberCount, pageTitle:"Edit Guild" , name:guildobj.guildname , iconurl:guildobj.iconurl , owner:guildobj.owner, guildid:guildobj.id})
})

router.post('/:id',(req,res)=>{
  console.log(req.body.channels)
  let channels = req.body.channels
  let regex = /^[a-zA-Z0-9\-\,]+/gm
  let result = channels.match(regex)
  webuser = req.session.user
  if(result == null) return res.send("malformed argument")
  let res_status = modifyguild(result,guildobj.id,webuser)
  if(res_status == 'Error') return res.send("Error")
  res.send("Success!")
})

module.exports = router