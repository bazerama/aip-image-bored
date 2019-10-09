import React from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import { Container, Header, Grid, Card } from 'semantic-ui-react';
import { authenticateAction } from '../actions/user.actions';
import CommentsModal from './CommentsModal';
import ReplyModal from './ReplyModal';
import UploadModal from './UploadModal';
import ForumPostCard from './ForumPostCard';
import MenuBar from './MenuBar';
import Leaderboard from './Leaderboard';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplyModal: false,
            showCommentsModal: false,
            showUploadModal: false,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authenticateAction());
    }

    openCommentsModal = () => {
        if (this.props.isLoggedIn) this.setState({ showCommentsModal: true });
    };
    closeCommentsModal = () => this.setState({ showCommentsModal: false });

    openReplyModal = () => {
        if (this.props.isLoggedIn) this.setState({ showReplyModal: true });
    };
    closeReplyModal = () => {
        this.setState({ showReplyModal: false });
    };

    openUploadModal = () => {
        if (this.props.isLoggedIn) this.setState({ showUploadModal: true });
    };
    closeUploadModal = () => {
        this.setState({ showUploadModal: false });
    };

    render() {
        const { showCommentsModal, showReplyModal, showUploadModal } = this.state;
        const { isLoggedIn } = this.props;
        return (
            <div>
                <CommentsModal
                    showCommentsModal={showCommentsModal}
                    openReplyModal={this.openReplyModal}
                    closeCommentsModal={this.closeCommentsModal}
                />
                <ReplyModal showReplyModal={showReplyModal} closeReplyModal={this.closeReplyModal} />
                <UploadModal showUploadModal={showUploadModal} closeUploadModal={this.closeUploadModal} />
                <MenuBar openUploadModal={this.openUploadModal} isLoggedIn={isLoggedIn} />
                <Container>
                    <Grid container celled="internally">
                        <Grid.Column width={12}>
                            <Card.Group>
                                <ForumPostCard isLoggedIn={isLoggedIn} openCommentsModal={this.openCommentsModal} />
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header textAlign="left" size="large">
                                Leaderboard
                            </Header>
                            <Grid.Column>
                                <Leaderboard />
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.authentication.isLoggedIn,
    };
};

export default connect(mapStateToProps)(HomePage);
