
const jwt = require("jsonwebtoken")
require('dotenv').config();
const {Wallet} = require('../models')


module.exports = async (req, res, next) => {
  //get token from request header
  const token = req.headers["authorization"]?.split(" ")[1] || null
  if (!token) res.status(400).send("Token not present")

  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, name) => {
    if (err) {
      res.status(403).send("Token invalid")
    }
    else {
      const user = (await Wallet.findOne({where: {name: name.user}}))
      req.walletId = user.id
      next() //proceed to the next action in the calling function
    }
  })
}
