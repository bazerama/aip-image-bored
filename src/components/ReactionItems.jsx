import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as reaction1 from '../resources/vince_wow.png';
import * as reaction2 from '../resources/spanish_laugh.png';
import * as reaction3 from '../resources/pogchamp.png';
import * as reaction4 from '../resources/tb_lul.png';
import * as reaction5 from '../resources/nick_young_confused.jpg';
import * as reaction6 from '../resources/michael_jordan_crying.png';
import { reactAction } from '../actions/forumpost.actions';
import { Label, Image } from 'semantic-ui-react';

const ReactionItems = props => {
    const [reactions, setReactions] = useState({
        reactionOne: 'unselected',
        reactionTwo: 'unselected',
        reactionThree: 'unselected',
        reactionFour: 'unselected',
        reactionFive: 'unselected',
        reactionSix: 'unselected',
    });

    useEffect(() => {
        if (props.reactions) {
            setReactions(reactions);
        }
    }, [props.reactions, reactions]);

    function handleReactionClick(event) {
        const { id } = event.currentTarget;
        if (props.isLoggedIn) {
            if (reactions[id] === 'selected') {
                // dispatch decrement with { id } and imageId (yet to be made)
                props.react(id, props.id, 'decrement');
                setReactions(prevState => ({ ...prevState, [id]: 'unselected' }));
            } else {
                // dispatch increment with { id } and imageId (yet to be made)
                props.react(id, props.id, 'increment');
                setReactions(prevState => ({ ...prevState, [id]: 'selected' }));
            }
        }
    }

    return (
        <div>
            <div className="reaction-div" id="reactionOne" onClick={handleReactionClick}>
                <Label className={'ui ' + reactions.reactionOne + ' big label'}>
                    {props.reactions.reactionOne}
                    <Image spaced="left" src={reaction1} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionTwo" onClick={handleReactionClick}>
                <Label className={'ui ' + reactions.reactionTwo + ' big label'}>
                    {props.reactions.reactionTwo}
                    <Image spaced="left" src={reaction2} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionThree" onClick={handleReactionClick}>
                <Label className={'ui ' + reactions.reactionThree + ' big label'}>
                    {props.reactions.reactionThree}
                    <Image spaced="left" src={reaction3} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionFour" onClick={handleReactionClick}>
                <Label className={'ui ' + reactions.reactionFour + ' big label'}>
                    {props.reactions.reactionFour}
                    <Image spaced="left" src={reaction4} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionFive" onClick={handleReactionClick}>
                <Label className={'ui ' + reactions.reactionFive + ' big label'}>
                    {props.reactions.reactionFive}
                    <Image spaced="left" src={reaction5} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionSix" onClick={handleReactionClick}>
                <Label className={'ui ' + reactions.reactionSix + ' big label'}>
                    {props.reactions.reactionSix}
                    <Image spaced="left" src={reaction6} />
                </Label>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        react: (reactionId, postId, mode) => dispatch(reactAction(reactionId, postId, mode)),
    };
};

const mapStateToProps = state => {
    return {
        reaction: state.reaction.reaction,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactionItems);
