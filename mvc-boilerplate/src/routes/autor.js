const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/AutorController');

router.get('/', AutorController.index);
router.post('/novo', AutorController.store);

module.exports = router;