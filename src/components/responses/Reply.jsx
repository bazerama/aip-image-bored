import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Image, Comment } from 'semantic-ui-react';

/*
 **  Idea for recursive rendering from Nick's code here:
 **  https://coderrocketfuel.com/article/recursion-in-react-render-comments-with-nested-children
 */

function Reply({ reply, isLoggedIn, openReplyModal }) {
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
}

export default Reply;
