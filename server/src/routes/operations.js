const generateRoutes = require('../../utils/generateRoutes')

const OperationsControllers = require('../controllers/OperationsControllers')
const validateToken = require('../middlewares/validateToken')

module.exports = (app) => {
	generateRoutes({app, namespace: 'operations', controller: OperationsControllers}, validateToken)
	app.get('/operations/amount',
    validateToken,
		OperationsControllers.getAmount
	)
	app.get('/operations/tag/:tagId',
    validateToken,
		OperationsControllers.findOperationByTagId
	)
}
