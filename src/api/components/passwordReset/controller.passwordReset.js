const userService = require('../../services/user.service');
const responseHelper = require('../../../helpers/response.helper');
const cryptoRandomString = require('crypto-random-string');
const passwordResetService = require('../../services/passwordReset.service');
const mailService = require('../../services/mail.service');
const templateHelper = require('../../../helpers/template.helper');
const generalConfig = require('../../../config/general.config');
const mailConfig = require('../../../config/mail.config');




async function makeHtmlSubject() {
  return await templateHelper.makeEmailHtml(
    mailConfig.templates.passwordReset.subject,
  );
}

async function makeHtmlBody(passwordResetLink) {
  const data = {
    passwordResetLink,
    projectName: generalConfig.projectName
  };
  return await templateHelper.makeEmailHtml(
    mailConfig.templates.passwordReset.body,
    data
  );
}

/**
 * Make and return password reset link
 * @param {String} passwordResetUrl
 * @param {String} token
 */
function makePasswordResetLink(passwordResetUrl, token){
  const separator = passwordResetUrl.includes('?') ? '&' : '?';
  return `${passwordResetUrl}${separator}token=${token}`;
}

/**
 * Возвращает TRUE, если токен просрочен
 * @param {Date} createdTokenTime
 */
function isExpiredToken (createdTokenTime) {
  const currentTime = Date.now();
  return (currentTime - createdTokenTime) > (+process.env.PASSWORD_RESET_TOKEN_EXPIRES * 1000);
}


/**
 * Создаем токен, пишем его в таблицу БД,
 * шлем письмо со ссылкой на сброс пароля
 * @param {Object} req
 * @param {Object} res
 */
async function sendToken(req, res) {
  const { email, resetLink } = req.body;
  // проверки
  if (!resetLink) {
    return res.status(400).send(
      responseHelper.makeErrorObject("password_reset_link_not_shared")
    );
  }
  let user = await userService.getUserFromEmail(email);
  if (!user) {
    return res.status(404).send(
      responseHelper.makeErrorObject("password_reset_user_not_found")
    );
  }

  // получаем токен и отсылаем его письмом
  const token = cryptoRandomString({length: 48});
  await passwordResetService.addToken(email, token); // пишем в БД

  const link = makePasswordResetLink(resetLink, token);
  const subject = await makeHtmlSubject();
  const body = await makeHtmlBody(link);

  await mailService.sendMail(email, subject, body);
  return res.send(responseHelper.makeSuccessObject());
}


/**
 * Устанавливаем новый пароль
 * @param {Object} req
 * @param {Object} res
 */
async function setNewPassword(req, res) {
  const { token, newPassword } = req.body;
  /* проверки */
  // если новый пароль не передан
  if (!newPassword) {
    return res.status(404).send(
      responseHelper.makeErrorObject("password_reset_new_password_not_found")
    );
  }
  // если токен не найден
  const tokenRec = await passwordResetService.getTokenRec(token);
  if (!tokenRec) {
    return res.status(404).send(
      responseHelper.makeErrorObject("password_reset_token_not_found")
    );
  }
  // если токен просрочен
  if (isExpiredToken(new Date(tokenRec.updateTimestamp))){
    await passwordResetService.deleteTokenRec(token); // удаляем запись токена из БД
    return res.status(400).send(
      responseHelper.makeErrorObject("password_reset_expired_token")
    );
  }
  /* меняем пароль */
  await userService.changePassword(tokenRec.email, newPassword);
  // удаляем запись токена из БД
  await passwordResetService.deleteTokenRec(token);

  res.send(responseHelper.makeSuccessObject());
}


async function passwordReset(req, res) {
  try {
    if (req.body.token) {
      // если этап изменения пароля
      await setNewPassword(req, res);
    } else {
      // если этап отправки письма на сброс пароля
      await sendToken(req, res);
    }
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}


module.exports = {
  passwordReset,
};