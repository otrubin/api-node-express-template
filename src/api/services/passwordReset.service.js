const db = require('../db');

async function addToken(email, token) {
  //удаляем старый токен (если есть)
  await db.passwordReset.destroy({ where: { email } });
  //добавляем новый токен
  await db.passwordReset.create({ email, token });
}


async function getTokenRec(token) {
  return await db.passwordReset.findOne({where: {token}});
}

async function deleteTokenRec(token) {
  await db.passwordReset.destroy({ where: { token } });
}



module.exports = {
  addToken,
  getTokenRec,
  deleteTokenRec
};
