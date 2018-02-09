import React, { Component } from 'react';
import { StackNavigator,  TabNavigator, TabBarBottom } from 'react-navigation';
import Login from './scenes/Login/Login';
import Dungeon from './scenes/Dungeon/Dungeon';
import Home from './scenes/Home/Home';
import Leaderboard from './scenes/Leaderboard/Leaderboard';
import Challenge from './scenes/Challenge/Challenge';
import Shop from './scenes/Shop/Shop';
import Quiz from './scenes/Challenge/Quiz';
import Settings from './scenes/Settings/Settings';

import { 
    BLACK_COLOR, 
    WHITE_COLOR,
    BLACK_LIGHT_COLOR, 
} from './ColorHexa';

const Tab = TabNavigator({
    Home: {
        screen: Home,
    },
    Shop: {
        screen: Shop,
    },
    Challenge: {
        screen: Challenge,
    },
    Dungeon: {
        screen: Dungeon,
    },
    Leaderboard: {
        screen: Leaderboard,
    },
},  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: false,
    animationEnabled: false,
    tabBarOptions: {
        activeTintColor: WHITE_COLOR,
        activeBackgroundColor: BLACK_LIGHT_COLOR,
        inactiveBackgroundColor: BLACK_COLOR,
        inactiveTintColor: WHITE_COLOR,
        style: {
            height: 60,
        }
    },
})

const Stack = StackNavigator({
    Login: {
        screen: Login,
    },
    Main: {
        screen: Tab,
    },
    Quiz: {
        screen: Quiz,
    },
    Settings: {
        screen: Settings,
    },
})

export default Stack;