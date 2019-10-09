const mongoose = require('mongoose');

/*
 * Has no attributes, is only used to group posts together into a thread.
 * The first 'Post' in a thread is considered the 'head' (the main post).
 * Deletion of a 'head' post removes all other posts in reply to that post, and the thread.
 */
const ThreadSchema = new mongoose.Schema(
    {
        id: Number,
        posts: [
            {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'Post',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Thread', ThreadSchema);
