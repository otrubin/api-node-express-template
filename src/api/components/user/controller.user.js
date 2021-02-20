const userService = require('../../services/user.service');

async function getUserList(req, res) {
  // console.log(req.query);
  const params = {};
  if (req.query.offset) { params.offset = +req.query.offset }
  if (req.query.limit) { params.limit = +req.query.limit }

  const users = await userService.getUserList(params);
  res.json({ users });
}


const controller = {
  getUserList
};
module.exports = controller;