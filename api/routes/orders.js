const express = require('express');
const router = express.Router();

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
})
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Orders were created'
    })
})
router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(200).json({
        message: 'Order details',
        orderId: orderId
    })
})
router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(200).json({
        message: 'Order deleted',
        orderId: orderId
    })
})

module.exports = router;