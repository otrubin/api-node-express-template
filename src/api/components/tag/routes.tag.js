const controller = require('./controller.tag');

module.exports = function(app, auth) {
  app.get("/api/tags",
    auth({ isEmailVerified: true }),
    controller.getTagList
  );
  app.get("/api/tags/:id",
    auth({ isEmailVerified: true }),
    controller.getTagById
  );
  app.post("/api/tags",
    auth({ isEmailVerified: true }),
    controller.createTag
  );
  app.put("/api/tags/:id",
    auth({ isEmailVerified: true }),
    controller.updateTag
  );
  app.delete("/api/tags/:id",
    auth({ isEmailVerified: true }),
    controller.deleteTag
  );
  app.delete("/api/tags",
    auth({ isEmailVerified: true }),
    controller.deleteAllTags
  );
};