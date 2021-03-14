module.exports = function (sequelize, Sequelize) {
  const tag = sequelize.define("tag", {
    accountId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    creatorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    canDeleted: {
      type: Sequelize.BOOLEAN            ,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    indexes: [
      {
        fields: ['accountId', 'title']
      },
    ]
  });
  return tag;
}