require('dotenv').config();
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
	bot:{
		token: process.env.BOT_TOKEN || ''
	}
}