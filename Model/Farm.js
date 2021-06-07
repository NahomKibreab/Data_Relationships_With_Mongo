const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose
  .connect('mongodb://localhost:27017/mongo_relation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((err) => {
    console.log('MongoDB got an error!');
    console.log(err);
  });

const productSchema = Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ['Summer', 'Spring', 'Winter', 'Falls'],
  },
});
const Product = mongoose.model('Product', productSchema);
const farmSchema = Schema({
  name: String,
  location: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Farm = mongoose.model('Farm', farmSchema);
// const addProduct = async () => {
//   const products = await Product.insertMany([
//     {
//       name: 'Water Melon',
//       price: 4.99,
//       season: 'Summer',
//     },
//     {
//       name: 'Golden Melon',
//       price: 4.99,
//       season: 'Summer',
//     },
//     {
//       name: 'Orange',
//       price: 2.99,
//       season: 'Falls',
//     },
//   ]);
//   console.log(products);
// };

// addProduct();

const addFarm = async () => {
  const farm = new Farm({
    name: 'Alebu Farm',
    location: 'Gash Barka, ER',
  });
  const product = await Product.findOne({ name: 'Orange' });
  farm.products.push(product);
  console.log(await farm.save());
};

addFarm();
