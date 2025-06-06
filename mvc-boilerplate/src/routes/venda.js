const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController');

router.get('/', VendaController.index);
router.post('/novo', VendaController.store);

module.exports = router;