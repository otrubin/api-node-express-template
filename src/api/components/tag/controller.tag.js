const tagService = require('../../services/tag.service');
const responseHelper = require('../../../helpers/response.helper');

async function getTagList(req, res) {
  //! сделать постраничную навигацию
  const tags = await tagService.getTagListForUser(req.user.id);
  res.status(200).json(
    responseHelper.makeSuccessObject({
      count: tags.length,
      tags
    })
  );
}


async function getTagById(req, res) {
  const tag = await tagService.getTagById(req.user.id, req.params.id);
  if(tag) {
    res.status(200).json(
      responseHelper.makeSuccessObject(tag)
    );
  }else{
    return res.status(404).send(
      responseHelper.makeErrorObject("tag_not_found")
    );
  }
}


async function createTag(req, res) {
  try {
    const {title} = req.body;
    if (!title) {
      return res.status(400).send(
        responseHelper.makeErrorObject("params_not_received", "title")
      );
    }
    let tag = await tagService.getTagByTitle(req.user.id, title);
    if (tag) { // Имя тега для одного пользователя, должно быть уникальным
      return res.status(400).send(
        responseHelper.makeErrorObject("tag_title_already_use", title)
      );
    }

    tag = await tagService.createTag(req.user.id, title);
    if (!tag) {
      return res.status(400).send(
        responseHelper.makeErrorObject("unknown_error")
      );
    }
    res.status(201).json(
      responseHelper.makeSuccessObject(tag)
    );
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}


async function updateTag(req, res) {
  try {
    const {title} = req.body;
    if (!title) {
      return res.status(400).send(
        responseHelper.makeErrorObject("params_not_received", "title")
      );
    }
    const tag = await tagService.updateTag(req.user.id, req.params.id, {title});
    if (!tag) {
      return res.status(400).send(
        responseHelper.makeErrorObject("unknown_error")
      );
    }
    res.status(200).json(
      responseHelper.makeSuccessObject({count: tag[0]})
    );
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}

async function deleteTag(req, res) {
  try {
    const num = await tagService.deleteTag(req.user.id, req.params.id);
    res.status(200).json(
      responseHelper.makeSuccessObject({count: num})
    );
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}

async function deleteAllTags(req, res) {
  try {
    const num = await tagService.deleteAllTags(req.user.id);
    res.status(200).json(
      responseHelper.makeSuccessObject({count: num})
    );
  } catch (error) {
    res.status(500).send(
      responseHelper.makeServerErrorObject(error.message)
    );
  }
}


module.exports = {
  getTagList,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  deleteAllTags
};