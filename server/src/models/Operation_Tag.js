
module.exports = (sequelize, DataTypes) => {
	const Operation_Tag = sequelize.define(
        'Operation_Tag',
        {},
        { timestamps: false }
    )



	return Operation_Tag
}
