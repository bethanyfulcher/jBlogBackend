const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                len:[8]
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len:[8]
            }
        }
    })

    User.associate = function(models) {
        User.hasMany(models.Blog);
    };

    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
}