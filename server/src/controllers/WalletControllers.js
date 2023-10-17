const bcrypt = require ('bcrypt')
const {Wallet} = require('../models')
const generateAccessToken = require('../../utils/generateAccessToken')


module.exports  = {
  async post (req,res) {
    try {
      const {name} = req.body

      const user = await Wallet.findOne({where: {name}})
      console.log(user);
      //check to see if the user exists in the list of registered users
      if (user) {
        res.status(404).send({message: "User is already exist!"})
        return
      }


      const secret = await bcrypt.hash(req.body.secret, 10)
      console.log('res1');
			const wallet = await Wallet.create({
        secret,
        name
			})
      console.log(wallet);

      res.status(201).send({
        message: "User created successfully!"
      })

    } catch (error) {
      console.log(error);
			res.status(400).send({
				error: 'Authentication failed',
        description: error,
			})

    }
  },
 async login (req,res) {
    const user = await Wallet.findOne({where: {name: req.body.name}})
    //check to see if the user exists in the list of registered users
    if (!user) return res.status(404).send ("User does not exist!")
    //if user does not exist, send a 400 response
    if (await bcrypt.compare(req.body.secret, user.secret)) {
      const accessToken = generateAccessToken({user: req.body.name})

      res.json({accessToken: accessToken})
    }

    else {
      res.status(401).send("Password Incorrect!")
    }
  }
}
