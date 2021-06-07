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
    console.log('MongoDB not connected!');
    console.log(err);
  });

const userSchema = Schema({
  name: String,
  age: Number,
});

const tweetSchema = Schema({
  text: String,
  likes: Number,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeUser = async () => {
//   const x = new User({ name: 'Senay', age: 36 });
//   const tweet2 = new Tweet({
//     text: 'My fourth tweet!',
//     likes: 1,
//   });
//   tweet2.user.push(x);
//   await x.save();
//   await tweet2.save();
// };

// makeUser();

const showTweets = async () => {
  const tweet = await Tweet.find({}).populate('user');

  for (x of tweet) {
    console.log(x.user);
  }
};
showTweets();
