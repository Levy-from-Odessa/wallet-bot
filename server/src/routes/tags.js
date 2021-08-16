const generateRoutes = require('../../utils/generateRoutes')

const TagsControllers = require('../controllers/TagsControllers.js')
module.exports = (app) => {
	generateRoutes({app, namespace: 'tags', controller: TagsControllers})
}