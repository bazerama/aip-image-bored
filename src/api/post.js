const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        id: Number,

        /* Text to accompany this specific post */
        title: String,

        /* Is this post first in the thread, if not it is considered a reply */
        head: Boolean,

        /* Path to reference to image */
        image: String,

        /* The user who created this post */
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        },

        reactions: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Reaction'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);