const fs = require("fs/promises");
const handlebars = require("handlebars");
const path = require("path");
const generalConfig = require('../config/general.config');

/**
 * Возвращает скомпилированный шаблон handlebars для использования в e-mail
 * @param {String} templateName
 * @param {Object} data
 */
async function makeEmailHtml(templateName, data = {}) {
  return await makeHtmlFromTemplate(
    path.join(generalConfig.pathEmailTemplate, templateName),
    data
  );
}

/**
 * Возвращает скомпилированный шаблон handlebars
 * из переданного полного пути к файлу .hbs
 * @param {String} fullTemplateFileName
 * @param {Object} data
 */
async function makeHtmlFromTemplate(fullTemplateFileName, data) {
  const html = await fs.readFile(fullTemplateFileName, "utf-8");
  const template = handlebars.compile(html);
  return template(data);
}

module.exports = {
  makeEmailHtml,
  makeHtmlFromTemplate
}