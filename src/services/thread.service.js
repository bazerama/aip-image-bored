const Thread = require('./../api/thread');
const Post = require('./../api/post');

let threadService = {
    createNewThread: (user_id, title, image) => {
        let thread = new Thread({});

        let post = new Post({
            title: title,
            image: image,
            head: true,
            user: user_id,
        });

        thread.posts.push(post);
        thread.save();

        return thread;
    },
    addNewReply: (thread_id, user_id, title, image) => {
        let thread = Thread.find({ _id: thread_id });

        let post = new Post({
            title: title,
            image: image,
            head: true,
            user: user_id,
        });

        thread.posts.push(post);
        thread.save();
    },
};

module.exports = threadService;
