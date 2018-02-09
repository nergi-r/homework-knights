import React, { Component } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import { BLACK_COLOR, WHITE_COLOR } from '../../ColorHexa';
import LastAttack from './LastAttack';
import Enemy from './Enemy';
import { fetchUser, fetchDragon } from '../../services';

import TabIcon from '../../components/TabIcon';

export default class Dungeon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: null,
                health: 0
            },
            dragon: {
                health: 0,
                maxHealth: 0,
                currentLevel: 0,
            }

        }
        this._handleUserFetched = this._handleUserFetched.bind(this);
        this._handleDragonFetched = this._handleDragonFetched.bind(this);
    }

    componentWillMount() {
        fetchUser(this._handleUserFetched);
    }

    _handleUserFetched(user) {
        this.setState({ user });
        fetchDragon(this._handleDragonFetched, user.className);
    }

    _handleDragonFetched(dragon) {
        this.setState({ dragon });
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Dungeon',
        headerStyle: {
            backgroundColor: BLACK_COLOR,
            elevation: 0
        },
        headerTitleStyle: {
            color: WHITE_COLOR
        },
        tabBarIcon: (
            <TabIcon
                source={require('../../assets/menu/dungeon.png')} />
        ),
    })

    render() {
        const { container, lastAttackContainer, textStyle } = styles;

        return(
            <View style={container}>
                <View style={lastAttackContainer}>
                    <Text style={textStyle}>Last Attack</Text>
                    <LastAttack />
                </View>
                <Enemy user={this.state.user} dragon={this.state.dragon} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lastAttackContainer: {
        backgroundColor: BLACK_COLOR,
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: WHITE_COLOR,
        marginLeft: 15,
    }
});