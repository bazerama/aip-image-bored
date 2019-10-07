const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema(
    {
        id: Number,

        /* The name of the reaction */
        name: String,

        /* The path to the icon for the reaction */
        path: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Reaction', ReactionSchema);
