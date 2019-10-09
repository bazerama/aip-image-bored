import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reactAction } from '../actions/user.actions';
import * as image1 from '../resources/c1.jpg';
import { Modal, Grid, Segment, Container, Image, Header, Icon, Button } from 'semantic-ui-react';

const ReplyModal = props => {
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    return (
        <Modal size="large" open={props.showReplyModal} onClose={props.closeReplyModal} className="modal-reply">
            <Grid>
                {imageUploaded ? (
                    imageUploading ? (
                        <Segment placeholder>
                            <Header icon>
                                <Icon name="image outline" />
                                Reply with an image
                                <Button secondary size="huge">
                                    Upload Image
                                </Button>
                            </Header>
                        </Segment>
                    ) : (
                        <Segment loading>
                            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                        </Segment>
                    )
                ) : (
                    <React.Fragment>
                        <Grid.Row className="modal-upload-image-row">
                            <Container className="modal-upload-image-container">
                                <Image className="modal-upload-image-img" src={image1} />
                            </Container>
                        </Grid.Row>
                        <Grid.Row className="modal-upload-buttons-row">
                            <Segment className="modal-upload-segment">
                                <Header textAlign="center" className="modal-upload-header">
                                    Use this image?
                                </Header>
                                <Button color="red" size="huge" className="modal-upload-button">
                                    Cancel
                                </Button>
                                <Button color="green" size="huge" className="modal-upload-button">
                                    Continue
                                </Button>
                            </Segment>
                        </Grid.Row>
                    </React.Fragment>
                )}
            </Grid>
        </Modal>
    );
};

export default ReplyModal;
