const bcrypt = require('bcryptjs');

async function initUserTable(db) {
  const bcrypt_salt = bcrypt.genSaltSync(+process.env.AUTH_SALT_LENGTH);
  const pass = bcrypt.hashSync("123", bcrypt_salt);
  try {
    await db.sequelize.sync({force: true});
    console.log('Drop and Resync Db');

    //create test admin data
    await db.user.create({
      email: 'otrubin@gmail.com',
      password: pass
    });

    for (let i = 1; i < 11; i++) {
      await db.user.create({
        email: `qqq${i}@qqq.ru`,
        password: pass
      });
    }
  } catch (error) {
    console.log(error);
  }
}


const service = {
  initUserTable,
};
module.exports = service;