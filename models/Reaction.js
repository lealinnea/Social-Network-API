const { Types, Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            objectId: new mongoose.Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// const Thought = model('thought', reactionSchema);

module.exports = reactionSchema;
