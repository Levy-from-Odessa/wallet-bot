const { Op } = require('sequelize')
const {sequelize} = require('../models')
const {Operation , Tag, Operation_Type, Currency } = require('../models')
module.exports  = {
	async index (req, res) {
		try{
			const {dateFrom, dateTo, type, tags} = req.query

			const whereOperation = {
				...dateFrom && { createdAt :{
					[Op.gte]: dateFrom
				}},
				...dateTo && {createdAt :{
					[Op.lte]: dateTo
				}},
			}

			const whereType = {
				...type && {
					name: type
				}
			}

			const whereTags = {
				...tags && {
					name: {
						[Op.in]: tags
					}
				}
			}

			const operations = await Operation.findAll({
				where: whereOperation,
				include:[
					{
						model: Operation_Type,
						where: whereType,
						as: 'type',
						attributes: ['name', 'id']
					},
					{
						model: Currency,
						as: 'currency',
						attributes: ['name', 'id']
					},
					{
						model: Tag,
						where: whereTags,
						as: 'tags',
						attributes: ['name', 'color', 'id'],
						through: {
							attributes: []
						}
					},
				]
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
			const {tags, type, currency, date } = req.body

			const operationType = (await Operation_Type.findOrCreate({
					where:{ name: type },
					default:{ name: type, }
			}))[0].id

			const currencyId = (await Currency.findOrCreate({
					where:{ name: currency},
					default:{ name: currency}
			}))[0].id


			const operation = await Operation.create({
					...req.body,
          createdAt: date,
          updatedAt: date,
					operationTypeId: operationType,
					currencyId: currencyId
			})

			await Promise.all(tags.map(async tag => {
				const itemTag = (await Tag.findOrCreate({
					where:{ name: tag},
					default:{ name: tag}
				}))[0]
				await operation.addTag(itemTag)
			}))

			const result = await Operation.findOne({
				where: {id: operation.id},
				include:[
					{
						model: Operation_Type,
						as: 'type',
						attributes: ['name', 'id']
					},
					{
						model: Currency,
						as: 'currency',
						attributes: ['name', 'id']
					},
					{
						model: Tag,
						as: 'tags',
						attributes: ['name', 'color', 'id'],
						through: {
							attributes: []
						}
					},
				]
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
