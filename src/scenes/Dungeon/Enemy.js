import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { RED_COLOR, WHITE_COLOR } from '../../ColorHexa';
import Status from './Status';

export default class Enemy extends Component {
    state = {
        fadeDamageAnim: new Animated.Value(0),
        damage: 0
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.dragon.health !== nextProps.dragon.health) {
            const damage = this.props.dragon.health - nextProps.dragon.health;
            this.setState({damage});
            
            Animated.sequence([
                Animated.timing(
                  this.state.fadeDamageAnim,
                  {
                    toValue: 1,
                    duration: 100,
                  }
                ),
                Animated.timing(
                  this.state.fadeDamageAnim,
                  {
                    toValue: 0,
                    duration: 2000,
                  }
                ),
            ]).start();
        }
    };

    render() {
        const { container, backgroundImageContainer, healthContainer,
            healthBarContainer, enemyContainer, damageContainer } = styles;
        const { enemyTextStyle, enemyStyle, damageStyle,
            healthTextStyle, healthBarShellStyle, healthBarStyle } = styles;

        const healthPercentage = this.props.dragon.health * 100.00 / (this.props.dragon.currentLevel * 10000);
        return (
            <View style={container}>
                <View style={backgroundImageContainer}>
                    <Image source={require('../../assets/dungeon/dungeon-background.png')} />
                </View>
                <Text style={enemyTextStyle}>Level {this.props.dragon.currentLevel} Dragon</Text>
                <View style={healthContainer}>
                    <Text style={healthTextStyle}>HP</Text>
                    <View style={healthBarContainer}>
                        <View style={healthBarShellStyle}>
                            <View style={[healthBarStyle, {width: `${healthPercentage}%`}]} />
                        </View>
                    </View>
                </View>

                <View style={enemyContainer}>
                    <Image style={enemyStyle}
                            source={require('../../assets/dungeon/dragon.png')} />
                </View>

                <Animated.View style={[damageContainer, {opacity: this.state.fadeDamageAnim}]}>
                    <Text style={damageStyle}>-{this.state.damage}</Text>
                </Animated.View>

                <Status user={this.props.user} dragon={this.props.dragon} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#595959'
    },
    backgroundImageContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    healthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    healthBarContainer: {
        flex: 1,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    damageContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    enemyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    enemyStyle: {
        alignSelf: 'center',
        margin: 20,
        flex: 1,
        resizeMode: 'contain'   
    },
    enemyTextStyle: {
        fontSize: 18,
        color: WHITE_COLOR,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold'
    },
    healthTextStyle: {
        fontSize: 16,
        color: WHITE_COLOR,
        fontWeight: 'bold',
        marginLeft: 10
    },
    healthBarShellStyle: {
        flex: 1,
        borderRadius: 45,
        backgroundColor: RED_COLOR
    },
    healthBarStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: WHITE_COLOR,
        borderRadius: 45
    },
    damageStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: RED_COLOR
    }
});