import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as reaction1 from '../resources/vince_wow.png';
import * as reaction2 from '../resources/spanish_laugh.png';
import * as reaction3 from '../resources/pogchamp.png';
import * as reaction4 from '../resources/tb_lul.png';
import * as reaction5 from '../resources/nick_young_confused.jpg';
import * as reaction6 from '../resources/peter_parker_cry.jpg';
import { reactAction } from '../actions/user.actions';
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

    function handleReactionClick(event) {
        console.log(event.currentTarget.id);
        const { id } = event.currentTarget;
        if (props.isLoggedIn) {
            if (reactions[id] === 'selected') {
                // dispatch decrement with { id } and imageId (yet to be made)
                setReactions(prevState => ({ ...prevState, [id]: 'unselected' }));
            } else {
                // dispatch increment with { id } and imageId (yet to be made)
                setReactions(prevState => ({ ...prevState, [id]: 'selected' }));
            }
        }
    }

    return (
        <div>
            <div className="reaction-div" id="reactionOne" onClick={handleReactionClick}>
                <Label color={reactions.reactionOne} size="big">
                    {reactions.reactionOne}
                    <Image spaced="left" src={reaction1} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionTwo" onClick={handleReactionClick}>
                <Label color={reactions.reactionTwo} size="big">
                    {reactions.reactionTwo}
                    <Image spaced="left" src={reaction2} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionThree" onClick={handleReactionClick}>
                <Label color={reactions.reactionThree} size="big">
                    {reactions.reactionThree}
                    <Image spaced="left" src={reaction3} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionFour" onClick={handleReactionClick}>
                <Label color={reactions.reactionFour} size="big">
                    {reactions.reactionFour}
                    <Image spaced="left" src={reaction4} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionFive" onClick={handleReactionClick}>
                <Label color={reactions.reactionFive} size="big">
                    {reactions.reactionFive}
                    <Image spaced="left" src={reaction5} />
                </Label>
            </div>
            <div className="reaction-div" id="reactionSix" onClick={handleReactionClick}>
                <Label color={reactions.reactionSix} size="big">
                    {reactions.reactionSix}
                    <Image spaced="left" src={reaction6} />
                </Label>
            </div>
        </div>
    );
};

export default ReactionItems;
