const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Downloadable', 'Subscription-based', 'Delivery-based'],
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
      required: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

mongoose.model('Product', productSchema);
