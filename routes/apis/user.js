const express = require('express');
const routerUser = express.Router();
/**
 * @api/user
 */
routerUser.get('/', (req, res) => {
  res.json({msg: 'get user api'})
})

module.exports = routerUser;