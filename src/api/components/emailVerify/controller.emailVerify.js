const userService = require('../../services/user.service');
const responseHelper = require('../../../helpers/response.helper');
const cryptoRandomString = require('crypto-random-string');
const emailVerifyService = require('../../services/emailVerify.service');
const mailService = require('../../services/mail.service');
const templateHelper = require('../../../helpers/template.helper');
const generalConfig = require('../../../config/general.config');
const mailConfig = require('../../../config/mail.config');




async function makeHtmlSubject() {
  return await templateHelper.makeEmailHtml(
    mailConfig.templates.emailVerify.subject,
  );
}

async function makeHtmlBody(emailVerifyLink) {
  return await templateHelper.makeEmailHtml(
    mailConfig.templates.emailVerify.body,
    {
      emailVerifyLink,
      projectName: generalConfig.projectName
    }
  );
}

/**
 * Make and return email verify link
 * @param {String} emailVerifyLink
 * @param {String} token
 */
function makeEmailVerifyLink(emailVerifyLink, token){
  const separator = emailVerifyLink.includes('?') ? '&' : '?';
  return `${emailVerifyLink}${separator}token=${token}`;
}

/**
 * Возвращает TRUE, если токен просрочен
 * @param {Date} createdTokenTime
 */
function isExpiredToken (createdTokenTime) {
  const currentTime = Date.now();
  return (currentTime - createdTokenTime) > (+process.env.EMAIL_VERIFY_TOKEN_EXPIRES * 1000);
}


/**
 * Создаем токен, пишем его в таблицу БД,
 * шлем письмо со ссылкой на подтверждение email
 * @param {String} email
 * @param {String} verifyLink
 */
async function sendVerifyLetter(email, verifyLink) {
  // проверки
  if (!verifyLink) {
    return {
      status: 404,
      payload: responseHelper.makeErrorObject("email_verify_link_not_shared")
    };
  }
  let user = await userService.getUserFromEmail(email);
  if (!user) {
    return {
      status: 404,
      payload: responseHelper.makeErrorObject("email_verify_user_not_found")
    };
  }
  // получаем токен и отсылаем его письмом
  const token = cryptoRandomString({length: 48});
  await emailVerifyService.addToken(email, token); // пишем в БД

  const link = makeEmailVerifyLink(verifyLink, token);
  const subject = await makeHtmlSubject();
  const body = await makeHtmlBody(link);

  await mailService.sendMail(email, subject, body);
  return {
    status: 200,
    payload: responseHelper.makeSuccessObject()
  };
}


/**
 * Верифицируем email
 * @param {String} token
 */
async function processEmailVerify(token) {
  /* проверки */
  // если токен не найден
  const tokenRec = await emailVerifyService.getTokenRec(token);
  if (!tokenRec) {
    return {
      status: 404,
      payload: responseHelper.makeErrorObject("email_verify_token_not_found")
    };
  }
  // если токен просрочен
  if (isExpiredToken(new Date(tokenRec.updateTimestamp))){
    await emailVerifyService.deleteTokenRec(token); // удаляем запись токена из БД
    return {
      status: 400,
      payload: responseHelper.makeErrorObject("email_verify_expired_token")
    };
  }
  /* подтверждаем верификацию email */
  await userService.setEmailVerificated(tokenRec.email, true);
  // удаляем запись токена из БД
  await emailVerifyService.deleteTokenRec(token);

  return {
    status: 200,
    payload: responseHelper.makeSuccessObject()
  };
}


async function emailVerify(req, res) {
  try {
    let result;
    if (req.body.token) {
      // если этап верификации email
      const { token } = req.body;
      result = await processEmailVerify(token);
    } else {
      // если этап отправки письма со ссылкой проверки email
      const { email, verifyLink } = req.body;
      result = await sendVerifyLetter(email, verifyLink);
    }
    //возвращем результат
    return res.status(result.status).send(
      result.payload
    );
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}


module.exports = {
  emailVerify,
  sendVerifyLetter,
  processEmailVerify
};