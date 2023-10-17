

const WalletControllers = require('../controllers/WalletControllers')

module.exports = (app) => {
	app.post('/api/wallet',
		WalletControllers.post
	)
	app.post('/api/login',
		WalletControllers.login
	)
}
