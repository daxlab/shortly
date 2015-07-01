/**
 * Created by mandeep on 1/7/15.
 */

var express = require('express');
var router = express.Router();
var shorten = require('../shorten');

router.get('/', shorten);

module.exports = router;
