const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

router.get('/products', (req, res) => {
  Product.find()
    .sort('-createdAt')
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/addProduct', (req, res) => {
  const { name, type, imageLink, price } = req.body;

  if (!name || !type || !imageLink || !price) {
    return res.status(422).json({ error: 'To add product into the system , provide all the details' });
  }

  const product = new Product({
    name,
    type,
    imageLink,
    price,
  });

  product
    .save()
    .then((result) => {
      res.json({ product: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: 'Error in adding product into the system', error: err });
    });
});

router.delete('/deleteProduct/:productId', (req, res) => {
  Product.findOne({ _id: req.params.productId }).exec((err, product) => {
    if (err || !product) {
      return res.status(422).json({ error: err });
    }
    if (product._id.toString() === req.productId.toString()) {
      post
        .remove()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
