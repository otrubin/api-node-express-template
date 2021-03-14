const userService = require('../../services/user.service');
const authServise = require('../../services/auth.service');
const responseHelper = require('../../../helpers/response.helper');
const emailVerifyController = require('../emailVerify/controller.emailVerify');

exports.register = async (req, res) => {
  const {email, password, verifyLink} = req.body;
  try {
    let user = await userService.getUserFromEmail(email);
    if (user) {
      return res.status(400).send(
        responseHelper.makeErrorObject("auth_email_already_register")
      );
    }
    user = await userService.registerUser({
      email,
      password
    });
    if(verifyLink) {
      const sendLetterResult = await emailVerifyController.sendVerifyLetter(email, verifyLink);
      if (sendLetterResult.status >= 200 && sendLetterResult.status < 300) {
        // если письмо верификации email ушло без ошибок
        res.status(201).json(
          responseHelper.makeSuccessObject({
            userId: user.id,
            sendVerifyLetter: true,
            sendVerifyError: ''
          })
        );
      }else{
        res.status(201).json(
          // если при попытке отправки письма верификации были ошибки
          responseHelper.makeSuccessObject({
            userId: user.id,
            sendVerifyLetter: true,
            sendVerifyError: sendLetterResult.payload.error.message
          })
        );
      }
    } else {
      res.status(201).json(
        responseHelper.makeSuccessObject({
          userId: user.id,
          sendVerifyLetter: false
        })
      );
    }
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    let user = await userService.getUserFromEmail(email);
    if (!user) {
      return res.status(404).send(
        responseHelper.makeErrorObject("auth_user_not_found")
      );
    }
    if (!authServise.isValidPassword(password, user)) {
      return res.status(401).send(
        responseHelper.makeErrorObject("auth_invalid_password")
      );
    }
    const token = authServise.makeToken({ id: user.id });
    res.status(200).send(responseHelper.makeSuccessObject({
      id: user.id,
      // email: user.email, //! ???
      accessToken: token,
    }));
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}