module.exports = function (sequelize, Sequelize) {
  const passwordResetObj = sequelize.define("passwordReset",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: 'updateTimestamp',
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
    ]
  });
  return passwordResetObj;
}