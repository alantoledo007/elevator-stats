const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Request",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
            },
            frequency:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
			start_time: {
                type: DataTypes.FLOAT,
                allowNull:false,
            },
            end_time: {
                type: DataTypes.FLOAT,
                allowNull:false
            },
            from: {
                type: DataTypes.JSON,
                allowNull:false
            },
            to: {
                type: DataTypes.JSON,
                allowNull:false
            }
		},
		{
			tableName: "requests",
		}
	);
};
