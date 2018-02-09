import React, { Component } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

export default class LastAttack extends Component {

    render() {
        return (
            <FlatList
                horizontal
                data={this.props.list}
                keyExtractor={(item, id) => id}
                renderItem={(item) => (
                    <Image source={{uri: item.item.photoURL}}
                            style={styles.imageStyle}
                    />
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 45,
        height: 35,
        width: 35,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15
}
});