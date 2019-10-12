import React from 'react';
import { connect } from 'react-redux';
import ReactionItems from './../responses/ReactionItems';
import * as image1 from '../../resources/c1.jpg';
import { Segment, Grid, Card, Image } from 'semantic-ui-react';

const ForumPostCard = props => {
    const { forumPost, isLoading, isAdmin, isLoggedIn } = props;

    if (isLoading) {
        return (
            <Segment loading>
                <Image src="/images/wireframe/paragraph.png" />
            </Segment>
        );
    }

    return (
        <Card fluid>
            <Image src={image1} fluid onClick={props.openCommentsModal} />
            <Card.Content onClick={props.openCommentsModal}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Card.Header as="h3">Posted by u/bazerama • 3 days ago</Card.Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={8}>
                            <Card.Header as="h3">5 replies</Card.Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
            <Card.Content extra>
                <ReactionItems isLoggedIn={isLoggedIn} />
            </Card.Content>
        </Card>
    );
};

export default ForumPostCard;
