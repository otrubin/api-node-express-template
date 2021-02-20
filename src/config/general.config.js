const path = require("path");

module.exports = {
  projectName: 'Проект «Теги»',
  apiRootPath: path.join(__dirname, '..', 'api'),
  appRootPath: path.join(__dirname, '..'),

  pathEmailTemplate: path.join(__dirname, '..', '/templates/mails'),
}