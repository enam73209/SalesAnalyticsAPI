const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/SalesController');

router.get('/sales/total-revenue',SalesController.TotalRevenue);
router.get('/sales/quantity-by-product',SalesController.QuantityByProduct);
router.get('/sales/top-products',SalesController.TopProducts);
router.get('/sales/average-price',SalesController.AVGPrice);
router.get('/sales/revenue-by-month/:date',SalesController.RevenueByMonth);
module.exports = router;