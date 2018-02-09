import React, { Component } from 'react';
import { StackNavigator,  TabNavigator, TabBarBottom } from 'react-navigation';
import Login from './scenes/Login/Login';
import Dungeon from './scenes/Dungeon/Dungeon';
import Home from './scenes/Home/Home';
import Leaderboard from './scenes/Leaderboard/Leaderboard';
import Challenge from './scenes/Challenge/Challenge';
import Shop from './scenes/Shop/Shop';
import Quiz from './scenes/Challenge/Quiz';
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
    lazy: true,
    animationEnabled: true,
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
})

export default Stack;