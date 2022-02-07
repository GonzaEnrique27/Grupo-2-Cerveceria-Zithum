module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        brandId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        subcategoryId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        sizeId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        tasteId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        alcohol: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        amargor: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        density: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        stock: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING(100),
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        }
        
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Brand, {
            as:"brand",
            foreignKey: "brandId"
        })
        Product.belongsTo(models.Subcategory, {
            as:"subcategory",
            foreignKey: "subcategoryId"
        })
        Product.belongsTo(models.Size, {
            as:"size",
            foreignKey: "sizeId"
        })
        Product.belongsTo(models.Taste, {
            as:"taste",
            foreignKey: "tasteId"
        })
        Product.hasMany(models.Order_item, {
            as: "order_items",
            foreignKey: "productId"
        })
    }

    return Product;
}
