const db = require('../db');

async function addToken(email, token) {
  //удаляем старый токен (если есть)
  await db.emailVerify.destroy({ where: { email } });
  //добавляем новый токен
  await db.emailVerify.create({ email, token });
}


async function getTokenRec(token) {
  return await db.emailVerify.findOne({where: {token}});
}

async function deleteTokenRec(token) {
  await db.emailVerify.destroy({ where: { token } });
}



module.exports = {
  addToken,
  getTokenRec,
  deleteTokenRec
};
