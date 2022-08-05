const express = require('express')
const router = express.Router();
const controller = require("../controller/apiController")

router.get('/',controller.statusReturn)
router.post('/donation',controller.donation)
router.get('/donation',controller.getDonations)


module.exports= router