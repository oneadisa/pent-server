module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landlord: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfReviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ratings: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
      },
    });
    Review.hasMany(models.ReviewMedia, {
      foreignKey: {
        name: 'reviewId',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Review;
};


