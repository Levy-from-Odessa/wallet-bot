const generateRoutes = require('../../utils/generateRoutes')

const ExpensesControllers = require('../controllers/ExpensesControllers')
const validateToken = require('../middlewares/validateToken')

module.exports = (app) => {
	generateRoutes({app, namespace: 'expenses', controller: ExpensesControllers}, validateToken)
}
