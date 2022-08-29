const Models = require('../src/models')
module.exports  = (namespace ) => {
    return { 
        async index (req, res) {
            try{
                const allItems = await Models[namespace].findAll()
                res.send(allItems)
            } catch(error) {
                res.status(400).send({
                    error: 'i have no' + namespace
                })
            }
        },
        async post (req, res) {
            try{
                const newItem = await Models[namespace].create(req.body)
                res.send(newItem)
            } catch(error) {
                res.status(400).send({
                    error: 'while trying to add ' + namespace
                })
            }
        },
        async delete (req, res) {
            try{
                const {id} = req.body
                await Models[namespace].destroy({
                    where: {
                        id: id
                    }
                })
                res.send('successful'+ id )
            } catch(error) {
                res.status(400).send({
                    error: 'Cant delete' + namespace
                })
            }
            
        },
        async edit (req, res) {
            try{
                const {id} = req.body
                const editItem = await Models[namespace].findOne({
                    where:{
                        id: id
                    }
                })
                tag.update(req.body)
                res.send(editItem)
            } catch(error) {
                res.status(400).send({
                    error: 'cant udate' + namespace
                })
            }
            
        },
        async findOne (req, res) {
            try{
                const {eventId} = req.body
                const oneItem = await Models[namespace].findOne({
                    where: {
                        id: eventId
                    },
                })
                res.send(oneItem)
            } catch(error) {
                res.status(400).send({
                    error: 'i have no this one' + namespace
                })
            }
        }
    }
}