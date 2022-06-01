const express = require('express');
const ejemploControllers = require('../controllers/ejemplo.controllers');
const router = express.Router();

router.get('/', ejemploControllers.getAll);

module.exports = router