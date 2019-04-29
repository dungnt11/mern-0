const express = require('express');
const routerUser = express.Router();
/**
 * @api/posts
 */
routerUser.get('/', (req, res) => {
  res.json({msg: 'get user api'})
})

module.exports = routerUser;