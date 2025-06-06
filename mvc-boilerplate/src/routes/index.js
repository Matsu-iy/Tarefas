const express = require('express');
const router = express.Router();
const autorRouter = require('./autor');
const livroRouter = require('./livro');
const vendaRouter = require('./venda');

// API routes
router.use('/autores', autorRouter);
router.use('/livros', livroRouter);
router.use('/vendas', vendaRouter);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handling for API routes
router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

module.exports = router;
