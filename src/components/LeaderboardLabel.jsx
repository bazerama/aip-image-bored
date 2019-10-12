import React from 'react';
import { Label } from 'semantic-ui-react';

const LeaderboardLabel = props => {
    const { color, content } = props;

    return <Label as={() => <div className={`ui ${color} label`}>{content}</div>} />;
};

export default LeaderboardLabel;
