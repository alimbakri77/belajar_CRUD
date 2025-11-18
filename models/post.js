'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Relasi Post dimiliki oleh User
      Post.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Post.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
};
