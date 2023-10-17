require('dotenv').config();
const path = require('path')

module.exports = {
	port: process.env.PORT || 8081,
	db: {
		database: process.env.DB_NAME ,
		options: {
			dialect: process.env.DIALECT ,
			host: process.env.HOST ,
			storage: path.join(process.env.STRORAGE),
		}
	},
  // ssl: {
  //   key: fs.readFileSync('../key.pem'),
  //   cert: fs.readFileSync('../cert.pem'),
  //   ca: fs.readFileSync('../csr.pem'),
  // },
	bot:{
		token: process.env.BOT_TOKEN || ''
	}
}
