
module.exports  = ({app, namespace, controller}, middleware) => {
	app.get(`/${namespace}`,
    middleware,
		controller.index
	)
	app.post(`/${namespace}`,
    middleware,
		controller.post
	)
	app.delete(`/${namespace}`,
    middleware,
		controller.delete
	)
	app.post(`/${namespace}`,
    middleware,
		controller.edit
	)
}
