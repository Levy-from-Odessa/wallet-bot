const generateRoutes = require('../../utils/generateRoutes')

const OperationsControllers = require('../controllers/OperationsControllers')
const validateToken = require('../middlewares/validateToken')

module.exports = (app) => {
	generateRoutes({app, namespace: 'operations', controller: OperationsControllers}, validateToken)
	app.get('/api/operations/amount',
    validateToken,
		OperationsControllers.getAmount
	)
	app.get('/api/operations/tag/:tagId',
    validateToken,
		OperationsControllers.findOperationByTagId
	)
}
