module.exports = (sequelize, dataTypes) => {
    let alias = "Taste";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "tastes",
        timestamps: false
    }

    const Taste = sequelize.define(alias, cols, config)

    Taste.associate = models => {
        Taste.hasMany(models.Product, {
            as: "products",
            foreignKey: "tasteId"
        })
    }

    return Taste;
}