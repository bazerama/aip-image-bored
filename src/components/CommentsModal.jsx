import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reactAction } from '../actions/user.actions';
import * as image1 from '../resources/c1.jpg';
import * as image2 from '../resources/c2.jpg';
import * as image4 from '../resources/c3.jpg';
import * as image3 from '../resources/c4.jpg';
import * as image5 from '../resources/c5.jpg';
import { Modal, Image, Divider, Header, Comment, Label, Icon } from 'semantic-ui-react';

const CommentsModal = props => {
    const [commentIsHidden, setCommentIsHidden] = useState(false);

    function handleCommentClick(event) {
        console.log(event);
        if (commentIsHidden) {
            setCommentIsHidden(false);
        } else {
            setCommentIsHidden(true);
        }
    }

    return (
        <Modal size="large" open={props.showCommentsModal} onClose={props.closeCommentsModal}>
            <Image src={image1} fluid />
            <Divider horizontal>
                <Header as="h3">Comments</Header>
            </Divider>
            <Comment.Group threaded size="large">
                <Comment>
                    <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">bazerama</Comment.Author>
                        <Comment.Metadata>Today at 5:32pm</Comment.Metadata>
                        <Comment.Text>
                            <Image src={image2} fluid />
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                {commentIsHidden ? (
                                    <Label onClick={handleCommentClick} color="black">
                                        <Icon name="unhide" />
                                        Show replies
                                    </Label>
                                ) : (
                                    <Label onClick={handleCommentClick} color="black">
                                        <Icon name="hide" />
                                        Hide replies
                                    </Label>
                                )}
                            </Comment.Action>
                            <Comment.Action>
                                <Label color="black" onClick={props.openReplyModal}>
                                    <Icon name="reply" />
                                    Reply
                                </Label>
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    <Comment.Group collapsed={commentIsHidden} size="large">
                        <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                        <Comment.Content>
                            <Comment.Author as="a">bazerama</Comment.Author>
                            <Comment.Metadata>Today at 5:32pm</Comment.Metadata>
                            <Comment.Text>
                                <Image src={image3} fluid />
                            </Comment.Text>
                        </Comment.Content>
                    </Comment.Group>
                    <Comment.Group collapsed={commentIsHidden} size="large">
                        <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                        <Comment.Content>
                            <Comment.Author as="a">bazerama</Comment.Author>
                            <Comment.Metadata>Today at 5:32pm</Comment.Metadata>
                            <Comment.Text>
                                <Image src={image4} fluid />
                            </Comment.Text>
                        </Comment.Content>
                    </Comment.Group>
                </Comment>
                <Comment size="large">
                    <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">bazerama</Comment.Author>
                        <Comment.Metadata>Today at 5:32pm</Comment.Metadata>
                        <Comment.Text>
                            <Image src={image5} fluid />
                        </Comment.Text>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        </Modal>
    );
};

export default CommentsModal;
