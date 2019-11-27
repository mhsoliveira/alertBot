const Product = require('../models/notification.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// controllers/products.js

exports.product_create = function (req, res) {
    let product = new Product(
        {
            tel: req.body.tel,
            rota: req.body.rota,
            hora: req.body.hora,
            lat: req.body.lat,
            long: req.body.long,
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};
