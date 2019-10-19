import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Image, Comment } from 'semantic-ui-react';

/**
 * This Reply component will be recursively rendered for each comment, allowing for every
 * post to have recursive replies. Two props have been removed (isLoggedIn, openReplyModal)
 * which could be used to hide or show different options. The cascading comments have also
 * been removed as there is only one 'level' of replies
 *
 * Idea for recursive rendering from Nick's code here:
 * https://coderrocketfuel.com/article/recursion-in-react-render-comments-with-nested-children
 */

const Reply = ({ reply }) => {
    const nestedReplies = (reply.replies || []).map(reply => {
        return <Comment key={reply.replyId} reply={reply} type="child" />;
    });

    var timeDistance = formatDistance(Date.now(), reply.timestamp);

    return (
        <Comment.Group collapsed={false} size="large">
            <Comment.Content>
                <Comment.Author as="a">{reply.userId}</Comment.Author>
                <Comment.Metadata>{timeDistance} ago</Comment.Metadata>
                <Comment.Text>
                    <Image src={reply.imageUrl} fluid />
                </Comment.Text>
            </Comment.Content>
            {nestedReplies}
        </Comment.Group>
    );
};

export default Reply;
