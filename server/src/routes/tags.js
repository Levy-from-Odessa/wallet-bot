const generateRoutes = require('../../utils/generateRoutes')

const TagsControllers = require('../controllers/TagsControllers.js')
const validateToken = require('../middlewares/validateToken')

module.exports = (app) => {
	generateRoutes({app, namespace: 'tags', controller: TagsControllers}, validateToken),

	app.get('/api/tags',
    validateToken,
		TagsControllers.index
	)
}
