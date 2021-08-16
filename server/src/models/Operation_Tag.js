
module.exports = (sequelize, DataTypes) => {
	const Operation_Tag = sequelize.define(
        'Operation_Tag', 
        {},
        { timestamps: false }
    )

	// Operation_Tag.associate = function(models) {
    //     Operation_Tag.belongsToMany(models.Operation, {
    //          through: Operation_Tag 
    //     });
    //     Operation_Tag.belongsToMany(models.tag, { 
    //         through: Operation_Tag 
    //     });
	// }
	return Operation_Tag
}