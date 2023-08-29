const generateRoutes = require('../../utils/generateRoutes')

const ExpensesControllers = require('../controllers/ExpensesControllers')

module.exports = (app) => {
	generateRoutes({app, namespace: 'expenses', controller: ExpensesControllers})
}
