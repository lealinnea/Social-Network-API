const { User } = require('../models');

const userController = {
 // get all users
 getUsers(req, res) {
  User.find()
    .select('-__v')
    .then((userDataB) => {
      res.json(userDataB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
// get single user
getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    // populating all friend by user
    .populate('friends')
    // populating all users thoughts
    .populate('thoughts')
    
    .then((userDataB) => {
      if (!userDataB) {
        return res.status(404).json({ message: 'User does not exhist' });
      }
      res.json(userDataB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // create a new post
  createUser(req, res) {
    User.create(req.body)
      .then((userDataB) => res.json(userDataB))
      .catch((err) => res.status(500).json(err));
  },

// update a user by id and reset body
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  )
  // then return user data if not return error message
    .then((userDataB) => {
      if (!userDataB) {
        return res.status(404).json({ message: 'User does not exhist' });
      }
      res.json(userDataB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

 // add friend 
 addFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId },
     { $addToSet: { friends: req.params.friendId } },
      { new: true })
    .then((userDataB) => {
      if (!userDataB) {
        return res.status(404).json({ message: 'User does not exhist' });
      }
      res.json(userDataB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
// remove friend from user profile
removeFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, 
    { $pull: { friends: req.params.friendId } },
     { new: true })
    .then((userDataB) => {
      if (!userDataB) {
        return res.status(404).json({ message: 'User does not exhist' });
      }
      res.json(userDataB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

};

module.exports = userController;