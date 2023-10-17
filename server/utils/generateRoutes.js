
module.exports  = ({app, namespace, controller}, middleware) => {
	app.get(`/api/${namespace}`,
    middleware,
		controller.index
	)
	app.post(`/api/${namespace}`,
    middleware,
		controller.post
	)
	app.delete(`/api/${namespace}`,
    middleware,
		controller.delete
	)
	app.post(`/api/${namespace}`,
    middleware,
		controller.edit
	)
}
