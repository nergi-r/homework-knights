import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import MS from '../Styles';
import TabIcon from '../../components/TabIcon';
import {
    TabNavigator
} from 'react-navigation';

//Tabs
import Weapons from './tabs/Weapons';
import Potions from './tabs/Potions';
import { BLACK_COLOR, BLUE_COLOR } from '../../ColorHexa';

export default class Shop extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Shop',
        headerStyle: [
            MS.headerStyle, 
            MS.headerShadowlessStyle
        ],
        headerTitleStyle: MS.headerTitleStyle,
        tabBarIcon: (
            <TabIcon
                source={require('../../assets/menu/shop.png')} />
        ),
    })

    _weapons = [
        {
            source: require('../../assets/weapons/axe.png'),
            price: 100
        },
        {
            source: require('../../assets/weapons/crossbow.png'),
            price: 100
        },
        {
            source: require('../../assets/weapons/mace.png'),
            price: 200
        },
        {
            source: require('../../assets/weapons/spear.png'),
            price: 300
        },
        {
            source: require('../../assets/weapons/sword.png'),
            price: 500
        },
    ]

    _potions = [
        {
            source: require('../../assets/potions/potion.png'),
            price: 1000,
            health: 100,
        },
        {
            source: require('../../assets/potions/super-potion.png'),
            price: 4000,
            health: 200,
        },
        {
            source: require('../../assets/potions/hyper-potion.png'),
            price: 0,
            health: 300,
        },
        {
            source: require('../../assets/potions/max-potion.png'),
            price: 4500,
            health: 400,
        },
    ]

    render(){
        return(
            <View
                style={[
                    MS.container,
                    {
                        backgroundColor: BLUE_COLOR,
                    },
                ]}>
                <ShopTab
                    screenProps={{
                        weapons: this._weapons,
                        potions: this._potions,
                    }} />
            </View>
        )
    }
}

const ShopTab = TabNavigator({
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