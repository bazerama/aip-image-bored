import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, Divider, Header, Comment, Icon, Card, Segment, Button } from 'semantic-ui-react';
import { getRepliesAction } from '../../actions/forumpost.actions';
import Reply from '../responses/Reply';

const CommentsModal = props => {
    const [thread, setThread] = useState(null);

    useEffect(() => {
        if (props.showCommentsModal) {
            const { threads } = props;
            threads.forEach(function(element) {
                if (element._id === props.commentsModalId && thread === null) {
                    setThread(element);
                    props.getReplies(element.replies);
                }
            });
        }
    });

    return thread && props.success && thread.replies.length > 0 ? (
        <Modal size="large" open={props.showCommentsModal} onClose={props.closeCommentsModal}>
            <Image src={thread.imageUrl} fluid />
            <Divider horizontal>
                <Header as="h3">Comments</Header>
            </Divider>
            <Comment.Group threaded size="large">
                <Comment>
                    {thread.replies.map(reply => {
                        return (
                            <Reply
                                key={reply.replyId}
                                reply={reply}
                                isLoggedIn={props.isLoggedIn}
                                openReplyModal={props.openReplyModal}
                            />
                        );
                    })}
                </Comment>
            </Comment.Group>
        </Modal>
    ) : thread ? (
        <Modal size="large" open={props.showCommentsModal} onClose={props.closeCommentsModal}>
            <Image src={thread.imageUrl} fluid />
            <Divider horizontal>
                <Header as="h3">Comments</Header>
            </Divider>
            <Card fluid>
                <Segment placeholder>
                    <Header icon>
                        <Icon name="image outline" />
                        There are no replies! Upload your reply to start a discussion.
                        <Button
                            id={thread._id}
                            depth={thread.depth}
                            secondary
                            size="huge"
                            onClick={props.openReplyModal}
                        >
                            Reply
                        </Button>
                    </Header>
                </Segment>
            </Card>
        </Modal>
    ) : null;
};

const mapDispatchToProps = dispatch => {
    return {
        getReplies: replies => dispatch(getRepliesAction(replies)),
    };
};

const mapStateToProps = state => {
    return {
        success: state.getReplies.success,
        replies: state.getReplies.replies,
        isLoading: state.getReplies.isLoading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsModal);
