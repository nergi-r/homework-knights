import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { BLACK_COLOR, WHITE_COLOR } from '../../ColorHexa';

export default class UserInfo extends Component {
    render(){
        return(
            <View
                style={styles.topContainer}>
                <Image
                    source={require('../../assets/user.png')}
                    borderRadius={100} />
                <View
                    style={styles.userInfoContainer}>
                    <Text
                        style={[styles.text, styles.titleText]}>
                        Albert Darmawan
                    </Text>
                    <View
                        style={styles.infoContainer}>
                        <Image
                            style={styles.infoImage}
                            source={require('../../assets/gold.png')} />
                        <Text
                            style={[styles.text, styles.infoText]}>
                            1123 golds
                        </Text>
                    </View>
                    <View
                        style={styles.infoContainer}>
                        <Image
                            style={styles.infoImage}
                            source={require('../../assets/heart.png')} />
                        <Text
                            style={[styles.text, styles.infoText]}>
                            1337
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: BLACK_COLOR,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    userInfoContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        color: WHITE_COLOR,
        marginBottom: 2,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 20,
    },
    infoContainer: {
        flexDirection: 'row',
    },
    infoImage: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        marginRight: 10,
    },
})