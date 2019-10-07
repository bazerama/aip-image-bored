import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Grid, Header, Button } from 'semantic-ui-react';
import { uploadImageAction } from '../actions/uploadimage.actions';
import { getLoggedInUser } from '../common/getLoggedInUser';

/*
 **  Some of this code is a customised version of Mosh's code and tutorial on Image Uploading here:
 **  https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
 */

const UploadModal = props => {
    const [file, setFile] = useState({
        image: null,
        imageSelected: false,
    });
    const { isUploading, isLoggedIn } = props;

    function onChange(event) {
        setFile(prevState => ({
            ...prevState,
            image: event.target.files[0],
            imageSelected: true,
        }));
    }

    function handleUploadClick() {
        if (file.imageSelected && file.image != null) {
            const { dispatch } = props;
            console.log(file.image);
            dispatch(uploadImageAction(file.image, getLoggedInUser()));
        }
    }

    return (
        <div>
            <Modal size="large" open={props.showUploadModal} onClose={props.closeUploadModal} className="modal-reply">
                <Grid celled="internally">
                    <Grid.Row>
                        <Grid.Column textAlign="center" width={16}>
                            <Header as="h1">Upload New Image</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="center" width={16}>
                            <input type="file" name="file" onChange={onChange} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="center" width={16}>
                            <Button disabled={!file.imageSelected} onClick={handleUploadClick}>
                                Upload
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isUploading: state.uploadimage.isUploading,
    };
};

export default connect(mapStateToProps)(UploadModal);
