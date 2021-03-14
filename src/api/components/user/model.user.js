module.exports = function (sequelize, Sequelize) {
  const user = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    emailVerify: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });
  return user;
}