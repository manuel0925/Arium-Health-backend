const { body,param } = require("express-validator");

module.exports = {
  postMiddleware(){
    return [
      body("email").isEmail(),
      body("password").isLength({ min: 7 }),
      body("firstName").not().isEmpty(),
      body("lastName").not().isEmpty(),
      body("role").not().isEmpty(),
    ]
  },

  putMiddleware(){
    return [
      body("email").isEmail(),
      body("password").isLength({ min: 7 }),
      /*body("firstName").isEmpty(),
      body("lastName").isEmpty(),*/
      body("firstName").not().isEmpty(),
      body("lastName").not().isEmpty(),
      body("role").not().isEmpty(),
    ]
  }
}