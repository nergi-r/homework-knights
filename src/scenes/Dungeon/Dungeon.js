import React, { Component } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import { BLACK_COLOR, WHITE_COLOR } from '../../ColorHexa';
import LastAttack from './LastAttack';
import Enemy from './Enemy';

export default class Dungeon extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Dungeon',
        headerStyle: {
            backgroundColor: BLACK_COLOR,
            elevation: 0
        },
        headerTitleStyle: {
            color: WHITE_COLOR
        }
    })

    render() {
        const { container, lastAttackContainer, textStyle } = styles;

        return(
            <View style={container}>
                <View style={lastAttackContainer}>
                    <Text style={textStyle}>Last Attack</Text>
                    <LastAttack />
                </View>
                <Enemy />
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