import React from 'react';
import { Menu } from 'semantic-ui-react';
import LeaderboardLabel from './LeaderboardLabel';

const Leaderboard = () => {
    return (
        <Menu vertical>
            <Menu.Item name="userFirst">
                <LeaderboardLabel content="1st" color="gold" />
                UsernameHere
            </Menu.Item>
            <Menu.Item name="userSecond">
                <LeaderboardLabel content="2nd" color="silver" />
                UsernameHere
            </Menu.Item>
            <Menu.Item name="userThird">
                <LeaderboardLabel content="3rd" color="bronze" />
                UsernameHere
            </Menu.Item>
            <Menu.Item name="userFourth">
                <LeaderboardLabel content="4th" color="leaderboard" />
                UsernameHere
            </Menu.Item>
            <Menu.Item name="userFifth">
                <LeaderboardLabel content="5th" color="leaderboard" />
                UsernameHere
            </Menu.Item>
        </Menu>
    );
};

export default Leaderboard;
