const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    Order.find()
    .select('quantity product _id')
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})
router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
    .then(result => {
        console.log(result);
        
        res.status(201).json({
            message: 'Orders were created',
            createdOrder: {
                product: result.productId,
                quantity: result.quantity,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders' + result._id
                }
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err})
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