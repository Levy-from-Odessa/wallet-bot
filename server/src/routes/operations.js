const generateRoutes = require('../../utils/generateRoutes')

const OperationsControllers = require('../controllers/OperationsControllers')

module.exports = (app) => {
	generateRoutes({app, namespace: 'operations', controller: OperationsControllers})
	app.get('/operations/amount',
		OperationsControllers.getAmount
	)
}