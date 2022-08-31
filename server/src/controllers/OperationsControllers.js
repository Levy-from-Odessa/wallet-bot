const {sequelize} = require('../models')
const {Operation , Tag } = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const operations = await Operation.findAll({
				include:[{
					model: Tag,
				}]
			})
			
			res.send(operations)
		} catch(error) {
			res.status(400).send({
				error: 'i have no operations'
			})
		}
	},
	async getItem(req, res){
		try {
			const {id} = req.params
			const operation = await Operation.findOne({
				where: {
					id
				},
				include:[{
					model: Tag,
				}]
			})
			res.send(operation)
		} catch (error) {
			res.status(400).send({
				error: 'i have no operation'  + id
			})
		}
	},

	async post (req, res) {
		try{
			const {tags, type} = req.body

			const operation = await Operation.create({
					...req.body,
				},
			)

			await Promise.all(tags.map(async tag => {
				await operation.addTag(await Tag.findOne({
					where:{ name: tag},
					default:{ name: tag}
				}))
			}))



			// ??how to create 1:m 
			await operation.addType(await Tag.findOne({
					where:{ name: type},
					default:{ name: type}
				})
			)

			const result = await Operation.findOne({
				where: {
					id: operation.id
				},
				include:[{
					model: Tag,
				}],
			})

			res.send(result)

		} catch(error) {
			res.status(400).send({
				description: 'while trying to add operation',
                error: error
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Operation.destroy({
				where: {
					id: id
				}
			})
			res.send('successful'+ id )
		} catch(error) {
			res.status(400).send({
				error: 'Cant delete'
			})
		}
		
	},
	async edit (req, res) {
	
		try{
			const {id} = req.body
			const operation = await Operation.findOne({
				where:{
					id: id
				},
				include:[{
					model: Operation,
					attributes: ['name', 'color']
				}]
			})
			operation.update(req.body)
			res.send({operation: operation})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	},

	async getAmount(req, res){
		try {
			const {groupBy} = req.query
			console.log(groupBy);
			const totalAmount = await Operation.findAll({
				attributes: [
					groupBy,
					[sequelize.fn('sum', sequelize.col('price')), 'total_amount'],
				],
				group: [groupBy],
			});
			res.send({totalAmount})
			
		} catch (error) {
			res.status(400).send({
				error: 'cant update' +error
			})
		}

	}
}