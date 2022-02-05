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
      res.status(422).json({ error: 'Error occured while fetching product', error: err });
    });
});

router.get('/product/:productId', (req, res) => {
  Product.findById(req.params.productId)
    .sort('-createdAt')
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json({ error: 'Error in finding product', error: err });
    });
});

router.post('/product', (req, res) => {
  const { name, type, imageLink, price } = req.body;

  if (!name || !type || !imageLink || !price) {
    return res.status(422).json({ errormsg: 'To add product into the system , provide all the details' });
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
      res.status(422).json({ errormsg: 'Error in adding product into the system', error: err });
    });
});

router.put('/product', (req, res) => {
  const updateProduct = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    price: req.body.price,
  };
  Product.findByIdAndUpdate(req.body.productId, updateProduct, {
    overwrite: true,
  }).exec((err, product) => {
    console.log(err, product);
    if (err) {
      return res.status(422).json({ errormsg: 'Error in updaing product into the system', error: err });
    } else {
      res.json(product);
    }
  });
});

router.delete('/product/:productId', (req, res) => {
  Product.findOneAndDelete({ _id: req.params.productId }).exec((err, product) => {
    if (err) {
      return res.status(422).json({ errormsg: 'Error in deleting product into the system', error: err });
    } else {
      res.json(product);
    }
  });
});

module.exports = router;
