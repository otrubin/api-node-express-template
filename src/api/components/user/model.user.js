module.exports = function (sequelize, Sequelize) {
  const user = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return user;
}