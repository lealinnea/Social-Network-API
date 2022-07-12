const { Thought, User } = require('../models');


thoughtController = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughtDB) => {
            res.json(thoughtDB);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    //get single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(async (thoughtDB) =>
                !thoughtDB
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ thoughtDB })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtDB) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughtDB._id } },
                    { runValidators: true, new: true }
                )
            })
            
            .then((userDataB) =>
                !userDataB
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID' })
                    : res.json(userDataB)
            )
            .catch((err) => res.status(400).json(err));
    },
    // Update a thought
    updateThought(req, res) {
        console.log('update thought');
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true,
            new: true }
        )
            .then((thoughtDB) =>
                !thoughtDB
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughtDB)
            )
            .catch((err) => res.status(500).json(err));
    },
    // deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thoughtDB) =>
                !thoughtDB
                    ? res.status(404).json({ message: 'No such thought exists' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((userDataB) =>
                !userDataB
                    ? res.status(404).json({
                        message: 'Thought deleted, but no user found',
                    })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //add reaction to thought
    addReaction(req, res) {
        console.log('Add Reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thoughtDB) =>
                !thoughtDB
                    ? res
                        .status(404)
                        .json({ message: 'No Thought found with that ID' })
                    : res.json(thoughtDB)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove reaction from thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactions: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thoughtDB) =>
                !thoughtDB
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


};
module.exports = thoughtController;