
module.exports  = ({app, namespace, controller}) => {
	app.get(`/${namespace}`,
		controller.index
	)
	app.post(`/${namespace}`,
		controller.post
	)
	app.delete(`/${namespace}`,
		controller.delete
	)
	app.post(`/${namespace}`,
		controller.edit
	)
}