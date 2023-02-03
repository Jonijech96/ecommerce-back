const {DataTypes} = require('sequelize');
const db = require('../utils/database');
const bcrypt = require('bcrypt');

const Users = db.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    username: {
        type:DataTypes.STRING(20),
        allowNull: false,
        
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
    },
    isConfirmed: {
        field: 'is_confirmed',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
{
    hooks: {
        beforeCreate: (user,options)=> {
            const {password} = user;
            const hash = bcrypt.hashSync(password,10);
            user.password = hash;
        }
    }
}
);

module.exports = Users;