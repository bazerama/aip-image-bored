import React from 'react';
import { Label } from 'semantic-ui-react';

/**
 * This component is uses custom props to display a coloured label
 * 1st, 2nd and 3rd have special gold, silver and bronze colours respectively
 * Any other position received uses a plain shade of gray
 */

const LeaderboardLabel = props => {
    const { color, content } = props;

    return <Label as={() => <div className={`ui ${color} label`}>{content}</div>} />;
};

export default LeaderboardLabel;
