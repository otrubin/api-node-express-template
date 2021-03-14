const { tag } = require('../db');

async function getTagListForUser(userId, params = {}) {
  params.where = {
    accountId: userId,
  };
  return await tag.findAll(params);
}

async function getTagById(userId, tagId) {
  return await tag.findOne({where: {
    id: tagId,
    accountId: userId,
  }});
}

async function getTagByTitle(userId, title) {
  return await tag.findOne({where: {
    title,
    accountId: userId,
  }});
}

async function createTag(userId, title) {
  return await tag.create({
    accountId: userId,
    title,
    creatorId: userId,
  });
}

/**
 *
 * @param {Number} userId
 * @param {Number} tagId
 * @param {Object} data
 * В объекте "data" передаем обновляемые поля
 * в формате {имя_поля1: значение, имя_поля2: значение, ...}
 */
async function updateTag(userId, tagId, data) {
  return await tag.update(
    data,
    {
      where: {
        id: tagId,
        accountId: userId,
      }
    }
  );
}

async function deleteTag(userId, tagId) {
  return await tag.destroy({
    where: {
      id: tagId,
      accountId: userId,
    }
  });
}

async function deleteAllTags(userId) {
  return await tag.destroy({
    where: {
      accountId: userId,
    }
  });
}

module.exports = {
  getTagListForUser,
  getTagById,
  createTag,
  getTagByTitle,
  updateTag,
  deleteTag,
  deleteAllTags,
};