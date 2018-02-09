import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { BLACK_COLOR, PURPLE_COLOR, WHITE_COLOR } from '../../ColorHexa';
import LeaderboardList from './LeaderboardList';

export default class Leaderboard extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Leaderboard',
        headerStyle: {
            backgroundColor: BLACK_COLOR
        },
        headerTitleStyle: {
            color: WHITE_COLOR,
        },
    })

    render(){
        const { container, leaderboardContainer, listContainer, columnContainer } = styles;
        const { titleStyle, columnStyle } = styles;

        return(
            <View style={container}>
                <View style={leaderboardContainer}>
                    <Text style={titleStyle}>This Week</Text>
                    <View style={columnContainer}>
                        <Text style={columnStyle}>Rank</Text>
                        <Text style={columnStyle}>Class Name</Text>
                        <Text style={columnStyle}>Dragon Defeated</Text>
                    </View>
                    <View style={listContainer}>
                        <LeaderboardList />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PURPLE_COLOR
    },
    leaderboardContainer: {
        flex: 1,
        margin: 10,
        marginTop: 20,
        backgroundColor: WHITE_COLOR
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    listContainer: {
        marginLeft: 15,
        marginRight: 15,
        borderTopWidth: 1
    },
    titleStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 24,
        marginTop: 20,
    },
    columnStyle: {
        fontSize: 16,
        color: '#000',
        padding: 15
    }
});