import React from 'react';
import _ from 'lodash';
import formatDistance from 'date-fns/formatDistance';
import ReactionItems from '../responses/ReactionItems';
import { Segment, Grid, Card, Image, Header, Icon, Button } from 'semantic-ui-react';

/**
 * This component uses lodash to render the threads on the image board once they have loaded
 * Threads are pushed to an array of cards, with buttons and reactions attached
 * NOTE: each thread is a root thread (i.e. one newly posted image to the board)
 */

const ForumPostCards = props => {
    const { openReplyModal, openCommentsModal, threads, isLoading, threadsErrorMessage, isLoggedIn } = props;
    var cards = [];

    if (threadsErrorMessage != null) {
        console.log(threadsErrorMessage);
    } else if (isLoading) {
        return _.times(5, i => {
            cards.push(
                <Card fluid key={i}>
                    <Segment loading>
                        <Image src="/images/wireframe/image.png" />
                    </Segment>
                </Card>
            );
        });
    } else {
        _.times(threads.length, i => {
            var timeDistance = formatDistance(Date.now(), threads[i].timestamp);
            cards.push(
                <Card fluid key={i}>
                    <Image src={threads[i].imageUrl} fluid />
                    <Card.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Card.Header as="h3">
                                        Posted by u/{threads[i].userId} • {timeDistance} ago
                                    </Card.Header>
                                </Grid.Column>
                                <Grid.Column textAlign="right" width={8}>
                                    <Button
                                        color="black"
                                        id={threads[i]._id}
                                        depth={threads[i].depth}
                                        icon="comments"
                                        content="View replies"
                                        labelPosition="right"
                                        onClick={openCommentsModal}
                                    />
                                    <Button
                                        color="black"
                                        id={threads[i]._id.toString()}
                                        depth={threads[i].depth}
                                        icon="reply"
                                        content="Reply"
                                        labelPosition="right"
                                        onClick={openReplyModal}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                    <Card.Content extra>
                        <ReactionItems id={threads[i]._id} reactions={threads[i].reactions} isLoggedIn={isLoggedIn} />
                    </Card.Content>
                </Card>
            );
        });
    }

    return (
        <Card.Group>
            {threads.length > 0 ? (
                cards
            ) : (
                <Card fluid>
                    <Header as="h1" icon>
                        No images here! Upload a new image to start a discussion.
                        <Icon name="images" />
                    </Header>
                </Card>
            )}
        </Card.Group>
    );
};

export default ForumPostCards;
