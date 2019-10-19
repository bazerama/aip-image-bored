import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Grid, Header, Button } from 'semantic-ui-react';
import { uploadImageAction } from '../../actions/upload.actions';
import { getLoggedInUser } from '../../services/user.service';

/**
 * This component handles a user uploading a brand new image to the board
 * To prevent users from stacking uploads and clogging the database, many
 * buttons are marked as 'loading' and blocked from clicking when the props
 * isUploading is true (after dispatch of request). Additionally, the page
 * is reloaded on success, in order to update the homepage with the new image
 *
 * This could be improved by updating HomePage's props of 'threads' and utilising
 * useEffect's array checks: https://stackoverflow.com/questions/55228102/react-hook-useeffect-dependency-array
 * However, this has not yet been completed
 *
 * Some of this code is a customised version of Mosh's code and tutorial on Image Uploading here:
 * https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
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
