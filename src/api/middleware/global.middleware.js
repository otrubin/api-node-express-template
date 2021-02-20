function emailToLowerString(req, res, next){
  // просто переводим все email нижний регистр
  if(req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  next();
};


module.exports = {
  emailToLowerString
};