const {Tag, Operation_Tag,Operation, sequelize } = require('../models')
const { Op } = require('sequelize')
const generateController = require('../../utils/generateController')
module.exports  = {
	...generateController('Tag'),

  async index(req, res) {
    let searchString = req.query.search;
    let limit = req.query.limit || 6;

    try {
      const whereOptions = searchString
        ? { name: { [Op.like]: `%${searchString}%`}}
        : {};

      const tags = await Tag.findAll({
        attributes: [
          'id',
          'name',
          'color',
          [sequelize.fn('count', sequelize.col('operations.id')), 'operation_count'],
        ],
        where: whereOptions,
        include: [
          {
            duplicating: false, // fix count + limit req
            model: Operation,
            as: 'operations',
            attributes: [],
          },
        ],
        group: ['Tag.id', 'Tag.name', 'Tag.color'],
        order: [[sequelize.literal('operation_count'), 'DESC']],
        limit: limit
      });

      res.send(tags)
    } catch (error) {
      console.error('Error fetching tags:', error);
      res.status(400).send({
        error: 'Error fetching tags'
      })
    }
  }

}
