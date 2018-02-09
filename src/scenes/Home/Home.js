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
    TabBarTop,
} from 'react-navigation';

//Services
import { 
    fetchUser,
} from '../../services';

//Tabs
import Weapons from './tabs/Weapons';
import Potions from './tabs/Potions';

import MS from '../Styles';
import TabIcon from '../../components/TabIcon';
import { BLACK_COLOR, WHITE_COLOR, RED_COLOR } from '../../ColorHexa';
import UserInfo from './UserInfo';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            weapons: [],
            potions: [],
            name: 'Loading...',
            gold: null,
            health: null,
            photo: require('../../assets/user.png'),
            isLoading: true,
        }
    }

    componentDidMount = () => {
        fetchUser(this._handleUserFetched.bind(this));
    }

    _handleUserFetched = (user) => {
        this.setState({
            weapons: user.weapons,
            potions: user.potions,
            name: user.name,
            photo: {uri: user.photoURL},
            gold: user.golds,
            health: user.health,
            isLoading: false,
        })
    }

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

    render(){
        return(
            <View
                style={[
                    MS.container,
                    styles.container,
                ]}>
                <UserInfo
                    photo={this.state.photo}
                    name={this.state.name}
                    gold={this.state.gold}
                    health={this.state.health} />
                <HomeTab
                    style={{
                        flex: 1,
                    }}
                    screenProps={{
                        weapons: this.state.weapons,
                        potions: this.state.potions,
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
}, {
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: '#FFFFFF',
        },
        style: {
            backgroundColor: BLACK_COLOR,
        }
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    lazy: false,
    animationEnabled: true,
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: RED_COLOR,
    },
});