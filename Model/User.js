const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/mongo_relation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo connected!');
  })
  .catch((err) => {
    console.log('Mongo got an error!');
    console.log(err);
  });

const userSchema = mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);
const addUser = async () => {
  const u = new User({
    first: 'Alex',
    last: 'Mehanzel',
    addresses: [
      {
        street: 'Houston TX',
        city: 'Houston',
        state: 'TX',
        country: 'USA',
      },
    ],
  });

  const result = await u.save();
  console.log(result);
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: 'Maitemenay 123',
    city: 'Asmara',
    country: 'Eritrea',
  });
  console.log(await user.save());
};

addUser();
addAddress('60bd372cc830a53534a48fa5');
