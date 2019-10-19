import React from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import { Container, Header, Grid } from 'semantic-ui-react';
import { authenticateAction } from '../../actions/user.actions';
import { getThreadsAction } from '../../actions/forumpost.actions';
import CommentsModal from '../responses/CommentsModal';
import ReplyModal from '../responses/ReplyModal';
import UploadModal from '../uploads/UploadModal';
import ForumPostCards from '../forum/ForumPostCards';
import MenuBar from '../menu/MenuBar';
import Leaderboard from '../leaderboard/Leaderboard';

/**
 * The landing page for the application at '/'
 * This component contains most of the functions to show and hide the modals, including Reply, Comment and Upload
 * Various props are passed to the child components, in order for them to call the methods here in their parent
 */

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplyModal: false,
            showCommentsModal: false,
            depth: null,
            replyModalId: null,
            commentsModalId: null,
            showUploadModal: false,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getThreadsAction());
        dispatch(authenticateAction());
    }

    openCommentsModal = event => {
        if (this.props.isLoggedIn) {
            this.setState({
                showCommentsModal: true,
                commentsModalId: event.currentTarget.id,
            });
        }
    };

    closeCommentsModal = () => {
        this.setState({ showCommentsModal: false, commentsModalId: null });
    };

    openReplyModal = event => {
        if (this.props.isLoggedIn) {
            console.log('replyModalId:', event.currentTarget.id);
            this.setState({
                showReplyModal: true,
                depth: event.currentTarget.getAttribute('depth'),
                replyModalId: event.currentTarget.id,
            });
        }
    };

    closeReplyModal = () => {
        this.setState({ showReplyModal: false, depth: null, replyModalId: null });
    };

    openUploadModal = () => {
        if (this.props.isLoggedIn) this.setState({ showUploadModal: true });
    };
    closeUploadModal = () => this.setState({ showUploadModal: false });

    render() {
        const { showCommentsModal, commentsModalId, showReplyModal, depth, replyModalId, showUploadModal } = this.state;
        const { isLoggedIn, threads, isLoading } = this.props;

        return (
            <div>
                <CommentsModal
                    threads={threads}
                    isLoggedIn={isLoggedIn}
                    showCommentsModal={showCommentsModal}
                    commentsModalId={commentsModalId}
                    openReplyModal={this.openReplyModal}
                    closeCommentsModal={this.closeCommentsModal}
                />
                <ReplyModal
                    showReplyModal={showReplyModal}
                    depth={depth}
                    replyModalId={replyModalId}
                    closeReplyModal={this.closeReplyModal}
                />
                <UploadModal showUploadModal={showUploadModal} closeUploadModal={this.closeUploadModal} />
                <MenuBar openUploadModal={this.openUploadModal} isLoggedIn={isLoggedIn} />
                <Container>
                    <Grid container celled="internally">
                        <Grid.Column width={12}>
                            <ForumPostCards
                                isLoggedIn={isLoggedIn}
                                threads={threads}
                                isLoading={isLoading}
                                openCommentsModal={this.openCommentsModal}
                                openReplyModal={this.openReplyModal}
                            />
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
        threads: state.getThreads.threads,
        isLoading: state.getThreads.isLoading,
        threadsErrorMessage: state.getThreads.threadsErrorMessage,
    };
};

export default connect(mapStateToProps)(HomePage);
