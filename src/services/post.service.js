const Thread = require('./../api/thread');
const Post = require('./../api/post');
const Reaction = require('./../api/reaction');

let postService = {
    reactToPost: (reaction_id, post_id) => {
        let post = Post.find({ _id: post_id });
        let reaction = Reaction.find({ _id: reaction_id });

        post.reactions.push(reaction);
        post.save();
    },
    removeReaction: (reaction_id, post_id) => {
        let post = Post.find({ _id: post_id });
        let reaction = Reaction.find({ _id: reaction_id });

        post.reactions.deleteOne({ _id: reaction_id });
    },
    getReactionCount: (reaction_id, post_id) => {
        let post = Post.find({ _id: post_id });

        return post.reactions.countDocuments({ _id: reaction_id }, (err, c) => {
            return c;
        });
    },
};

module.exports = postService;
