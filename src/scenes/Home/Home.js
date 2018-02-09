import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    TabNavigator,
} from 'react-navigation';

//Tabs
import Weapons from './tabs/Weapons';
import Potions from './tabs/Potions';

import MS from '../Styles';
import TabIcon from '../../components/TabIcon';
import { BLACK_COLOR, WHITE_COLOR, RED_COLOR } from '../../ColorHexa';
import UserInfo from './UserInfo';

export default class Home extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '',
        tabBarLabel: 'Home',
        tabBarIcon: (
            <TabIcon
                source={require('../../assets/menu/home.png')} />
        ),
        headerStyle: [
            MS.headerStyle, 
            MS.headerShadowlessStyle,
        ],
        headerTitleStyle: [
            MS.headerTitleStyle
        ],
        headerRight: (
            <TouchableOpacity
                onPress={() => { alert('Settings') }}
                style={{
                    marginRight: 15,
                }}>
                <Image
                    source={require('../../assets/settings.png')}
                    style={{
                        width: 24,
                        height: 24,
                    }} />
            </TouchableOpacity>
        ),
    })

    _weapons = [
        {
            source: require('../../assets/weapons/axe.png'),
            count: 1
        },
        {
            source: require('../../assets/weapons/crossbow.png'),
            count: 1
        },
        {
            source: require('../../assets/weapons/mace.png'),
            count: 2
        },
        {
            source: require('../../assets/weapons/spear.png'),
            count: 3
        },
        {
            source: require('../../assets/weapons/sword.png'),
            count: 5
        },
    ]

    _potions = [
        {
            source: require('../../assets/potions/potion.png'),
            count: 1
        },
        {
            source: require('../../assets/potions/super-potion.png'),
            count: 1
        },
        {
            source: require('../../assets/potions/hyper-potion.png'),
            count: 1
        },
        {
            source: require('../../assets/potions/max-potion.png'),
            count: 1
        },
    ]

    render(){
        return(
            <View
                style={[
                    MS.container,
                    styles.container,
                ]}>
                <UserInfo
                    image={require('../../assets/user.png')}
                    name='Albert Darmawan'
                    gold={1123}
                    health={1337} />
                <HomeTab
                    style={{
                        flex: 1,
                    }}
                    screenProps={{
                        weapons: this._weapons,
                        potions: this._potions,
                    }} />
            </View>
        )
    }
}

const HomeTab = TabNavigator({
    Weapons: {
        screen: Weapons,
    },
    Potions: {
        screen: Potions,
    }
}, {tabBarOptions: {
    indicatorStyle: {
        backgroundColor: '#FFFFFF',
    },
    style: {
        backgroundColor: BLACK_COLOR,
    }
}});

const styles = StyleSheet.create({
    container: {
        backgroundColor: RED_COLOR,
    },
});