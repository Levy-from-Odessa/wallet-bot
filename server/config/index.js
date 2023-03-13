require('dotenv').config();
const fs = require('fs');
module.exports = {
	port: process.env.PORT || 8080,
	db: {
		database: process.env.DB_NAME || 'wallet',
		options: {
			dialect: process.env.DIALECT || 'sqlite',
			host: process.env.HOST || 'localhost',
			storage: './wallet.sqlite'
		}
	},
  ssl: {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem'),
    ca: fs.readFileSync('../csr.pem'),
  },
	bot:{
		token: process.env.BOT_TOKEN || ''
	}
}
