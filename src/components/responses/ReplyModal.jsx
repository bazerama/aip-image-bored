import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Grid, Segment, Image, Header, Icon, Button } from 'semantic-ui-react';
import { uploadReplyAction } from '../../actions/upload.actions';
import { getLoggedInUser } from '../../services/user.service';

/**
 * This component handles a user replying to an image on the board. To prevent users
 * from stacking replies and clogging the database, many buttons are marked as 'loading'
 * and blocked from clicking when the props isUploading is true (after dispatch of request).
 * Additionally, the page is reloaded on success, in order to update the post with the new reply
 * Currently the modal does not reopen after reload, so obviously a rerender would be preferable
 * to a full page reload, in order to keep the modal open
 */

const ReplyModal = props => {
    const [file, setFile] = useState({ image: null, imageSelected: false });
    const { success, isUploading } = props;

    useEffect(() => {
        if (success) {
            props.closeReplyModal();
            window.location.reload();
        }
    });

    function onChange(event) {
        const file = event.target.files[0];
        setFile(prevState => ({
            ...prevState,
            image: file,
            imageSelected: true,
        }));
    }

    function handleUploadClick() {
        if (file.imageSelected && file.image != null) {
            const { dispatch } = props;
            dispatch(uploadReplyAction(props.depth, props.replyModalId, file.image, getLoggedInUser()));
        }
    }

    return (
        <Modal
            centered
            size="large"
            open={props.showReplyModal}
            onClose={props.closeReplyModal}
            className="modal-reply"
        >
            {!success ? (
                !isUploading ? (
                    <Grid celled="internally">
                        <Grid.Row>
                            <Grid.Column textAlign="center" width={16}>
                                <Header as="h1" icon>
                                    <Icon name="image outline" />
                                    Reply with an image
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign="center" width={16}>
                                <input type="file" name="file" onChange={onChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign="center" width={16}>
                                <Button
                                    secondary
                                    size="huge"
                                    loading={isUploading}
                                    disabled={!file.imageSelected}
                                    onClick={handleUploadClick}
                                >
                                    Upload Image
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                ) : (
                    <Segment loading>
                        <Image fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
                    </Segment>
                )
            ) : null}
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        success: state.uploadReply.success,
        isUploading: state.uploadReply.isUploading,
        reply: state.uploadReply.reply,
    };
};

export default connect(mapStateToProps)(ReplyModal);
