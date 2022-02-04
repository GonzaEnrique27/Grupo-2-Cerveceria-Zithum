const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const usersFilePath = path.join(__dirname, '../database/users.json');

module.exports = {
    getProducts : JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),

    getUsers : JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')),

    writeJson: (database) =>{
        fs.writeFileSync(productsFilePath,JSON.stringify(database),'utf-8')
    },
    writeJsonUser: (database) =>{
        fs.writeFileSync(usersFilePath,JSON.stringify(database),'utf-8')
    }
}