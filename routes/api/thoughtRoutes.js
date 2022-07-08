const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  createThought,

} = require('../../controllers/thoughtController');


router.route('/').get(getThought).post(createThought);


router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
