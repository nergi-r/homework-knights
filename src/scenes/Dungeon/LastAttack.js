import React, { Component } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

export default class LastAttack extends Component {
    state = {
        list: [
            {
                key: 1,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/homework-knights.appspot.com/o/user.png?alt=media&token=7f6d2a3c-04c2-41b4-8531-970513830a66'
            },
            {
                key: 2,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/homework-knights.appspot.com/o/user.png?alt=media&token=7f6d2a3c-04c2-41b4-8531-970513830a66'
            },
            {
                key: 3,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/homework-knights.appspot.com/o/user.png?alt=media&token=7f6d2a3c-04c2-41b4-8531-970513830a66'
            },
            {
                key: 4,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/homework-knights.appspot.com/o/user.png?alt=media&token=7f6d2a3c-04c2-41b4-8531-970513830a66'
            },
            {
                key: 5,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/homework-knights.appspot.com/o/user.png?alt=media&token=7f6d2a3c-04c2-41b4-8531-970513830a66'
            },
        ]
    };

    render() {
        return (
            <FlatList
                horizontal
                data={this.state.list}
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