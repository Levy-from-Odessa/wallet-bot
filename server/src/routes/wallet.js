

const WalletControllers = require('../controllers/WalletControllers')

module.exports = (app) => {
	app.post('/wallet',
		WalletControllers.post
	)
	app.post('/login',
		WalletControllers.login
	)
}
