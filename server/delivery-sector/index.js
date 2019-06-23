const router = require('express').Router();

const controller = require('./delivery-sector.controller.js');

router.post('/', controller.getSector);

module.exports = router;
