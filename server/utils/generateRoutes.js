
module.exports  = ({app, namespace, controller}) => {
    console.log(namespace, 'generator');
	app.get(`/${namespace}`,
		controller.index
	)
	app.post(`/${namespace}/create`,
		controller.post
	)
	app.delete(`/${namespace}/delete`,
		controller.delete
	)
	app.post(`/${namespace}/edit`,
		controller.edit
	)
}