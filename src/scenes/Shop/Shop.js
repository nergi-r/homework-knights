import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import MS from '../Styles';
import TabIcon from '../../components/TabIcon';
import {
    TabNavigator
} from 'react-navigation';

//Firebase
import { fetchWeapons, fetchPotions } from '../../services';

//Tabs
import Weapons from './tabs/Weapons';
import Potions from './tabs/Potions';
import { BLACK_COLOR, BLUE_COLOR } from '../../ColorHexa';

import _ from 'lodash';

export default class Shop extends Component {

    constructor(props){
        super(props);
        this.state = {
            weapons: [],
            potions: [],
        }

        this._handlePotionsFetched = this._handlePotionsFetched.bind(this);
        this._handleWeaponsFetched = this._handleWeaponsFetched.bind(this);
    }

    componentDidMount = () => {
        fetchPotions()
        .then(potions => {
            let pot = _.map(potions.val(), val => {
                return {
                    ...val
                };
            });
            this._handlePotionsFetched(pot);
        })

        fetchWeapons()
        .then(weapons => {
            let weap = _.map(weapons.val(), val => {
                return {
                    ...val
                };
            });
            this._handleWeaponsFetched(weap);
        })
    }

    _handleWeaponsFetched = (weapons) => {
        this.setState({
            weapons,
        })
    }

    _handlePotionsFetched = (potions) => {
        this.setState({
            potions,
        })
    }

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
                        weapons: this.state.weapons,
                        potions: this.state.potions,
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