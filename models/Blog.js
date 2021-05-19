const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define('Blog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        DateTime: {
            type: DataTypes.DATEONLY,
            get: function() {
                return moment(this.getDataValue('DateTime')).format('DD.MM.YYYY')
            }
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Blog.associate = function(models) {
        Blog.belongsTo(models.User)
    };

    return Blog;
};

// module.exports = function(sequelize, DataTypes) {
//     var Tank = sequelize.define('Tank', {
//         name:{
//             type:DataTypes.STRING,
//             allowNull:false
//         }
//     });

//     Tank.associate = function(models) {
//         Tank.hasMany(models.Fish);
//         Tank.belongsTo(models.User);
//     }

//     return Tank;
// }