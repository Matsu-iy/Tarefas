const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/LivroController');

router.get('/', LivroController.index);
router.post('/novo', LivroController.store);

module.exports = router;