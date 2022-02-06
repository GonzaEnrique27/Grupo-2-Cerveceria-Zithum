module.exports = (sequelize, dataTypes) => {
    let alias = "Size";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        measure: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    
    let config = {
        tableName: "sizes",
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config)

    Size.associate = models => {
        Size.hasMany(models.Product, {
            as: "products",
            foreignKey: "sizeId"
        })
    }

    return Size;
}