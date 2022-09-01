module.exports = (sequelize, DataTypes) => {
  const ReviewMedia = sequelize.define('ReviewMedia', {
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  ReviewMedia.associate = (models) => {
    ReviewMedia.belongsTo(models.Review, {
      foreignKey: {
        name: 'reviewId',
      },
    });
    ReviewMedia.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
      },
    });
  };

  return ReviewMedia;
};

