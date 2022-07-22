const express = require('express')
const router = express.Router();
const controller = require("../controller/apiController")

router.get('/',controller.statusReturn)


module.exports= router