import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WHITE_COLOR, PURPLE_COLOR } from '../../ColorHexa';
import { fetchRank } from '../../services';

export default class LeaderboardList extends Component {
    state = {
        list: []
    };

    componentDidMount() {
        fetchRank().then((result) => {
            this.setState({ list : result });
        });
    }

    renderRow({ index, item }) {
        const { columnContainer, columnStyle } = styles;
        const backgroundColor = index % 2 === 0 ? 'rgba(142, 68, 173, 0.2)' : WHITE_COLOR;

        return (
            <View style={{flex: 1, backgroundColor}}>
                <View style={columnContainer}>
                    <Text style={[columnStyle, {flex: 1}]}>{index+1}</Text>
                    <Text style={[columnStyle, {flex: 2}]}>{item.className}</Text>
                    <Text style={[columnStyle, {flex: 2}]}>Level {item.currentLevel}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            this.state.list.length > 0
            ?   <FlatList
                    style={styles.container}
                    data={this.state.list}
                    keyExtractor={(item, id) => id}
                    renderItem={this.renderRow}
                />
            : <ActivityIndicator size='large' />
        );
    }
}

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    columnStyle: {
        fontSize: 15,
        color: '#000',
        margin: 10,
        marginLeft: 15,
    }
})