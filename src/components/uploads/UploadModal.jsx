import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Grid, Header, Button } from 'semantic-ui-react';
import { uploadImageAction } from '../../actions/upload.actions';
import { getLoggedInUser } from '../../services/user.service';

/*
 **  Some of this code is a customised version of Mosh's code and tutorial on Image Uploading here:
 **  https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
 */

const UploadModal = props => {
    const [file, setFile] = useState({ image: null, imageSelected: false });
    const { isUploading, success } = props;

    useEffect(() => {
        if (success) {
            props.closeUploadModal();
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
                            <Button loading={isUploading} disabled={!file.imageSelected} onClick={handleUploadClick}>
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
        success: state.uploadImage.success,
        isUploading: state.uploadImage.isUploading,
    };
};

export default connect(mapStateToProps)(UploadModal);
