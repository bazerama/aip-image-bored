import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as reaction1 from '../../resources/vince_wow.png';
import * as reaction2 from '../../resources/spanish_laugh.png';
import * as reaction3 from '../../resources/pogchamp.png';
import * as reaction4 from '../../resources/tb_lul.png';
import * as reaction5 from '../../resources/nick_young_confused.jpg';
import * as reaction6 from '../../resources/michael_jordan_crying.png';
import { reactAction } from '../../actions/forumpost.actions';
import { Label, Image } from 'semantic-ui-react';

/**
 * This component handles a user reacting to an image, where they will
 * pick from a range of six reactions. Reactions can be added and removed but it's not working as intended
 * Currently the user can add and remove, but the page does not render updates
 * Additionally, the user can only remove a reaction before re-rendering, the current reactions a user has
 * given are not stored so a user can just keep reacting/removing reactions.
 *
 * These two defects can fixed by updating the useEffect below to reflect updates to the props,
 * in addition to tracking the reactions a user has submitted (although this would take some time to implement)
 *
 * useEffect/useRef code from Ryan on SO: https://stackoverflow.com/questions/55228102/react-hook-useeffect-dependency-array
 */

const ReactionItems = props => {
    const previousReactions = useRef(props.reactions);
    const [reactions, setReactions] = useState({
        reactionOne: 'unselected',
        reactionTwo: 'unselected',
        reactionThree: 'unselected',
        reactionFour: 'unselected',
        reactionFive: 'unselected',
        reactionSix: 'unselected',
    });

    useEffect(() => {
        setReactions(props.reactions);
        previousReactions.current = props.reactions;
    }, [props.reactions]);

    function handleReactionClick(event) {
        const { id } = event.currentTarget;
        if (props.isLoggedIn) {
            if (reactions[id] === 'selected') {
                props.react(id, props.id, 'decrement');
                setReactions(prevState => ({ ...prevState, [id]: 'unselected' }));
            } else {
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
