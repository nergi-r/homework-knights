import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { WHITE_COLOR, PINK_COLOR, RED_COLOR } from '../../ColorHexa';
import { attackDragon } from '../../services';

export default class Status extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentWeapon: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.currentWeapon === null && nextProps.user.weapons) {
            nextProps.user.weapons.forEach((weapon) => {
                if(weapon.count > 0) {
                    this.setState({ 
                        currentWeapon: weapon 
                    });
                }
            })
        }
        else {
            nextProps.user.weapons.forEach(weapon => {
                if(weapon.name == this.state.currentWeapon.name){
                    if(weapon.count <= 0) {
                        this.setState({
                            currentWeapon: null,
                        });
                    }
                }
            })
        }
    }

    render() {
        const { container, healthContainer, weaponContainer } = styles;
        const { healthStyle, healthTextStyle, buttonStyle, buttonTextStyle, weaponStyle } = styles;

        return (
            <View style={container}>
                <View>
                    <Image source={require('../../assets/heart.png')}
                            style={healthStyle} />
                    <Text style={healthTextStyle}>
                        {this.props.user.health}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => attackDragon(this.state.currentWeapon, this.props.user, this.props.dragon)}
                    style={buttonStyle}
                >
                    <Text style={buttonTextStyle}>ATTACK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={weaponContainer}>
                    <Image style={weaponStyle}
                        source={(this.state.currentWeapon)
                            ? {uri: this.state.currentWeapon.photoURL}
                            : null
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10
    },
    weaponContainer: {
        height: 50,
        width: 50,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: RED_COLOR,
        backgroundColor: WHITE_COLOR
    },
    weaponStyle: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        margin: 3,
        resizeMode: 'contain'
    },
    healthStyle: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
    healthTextStyle: {
        color: WHITE_COLOR,
        alignSelf: 'center'
    },
    buttonStyle: {
        width: 150,
        alignSelf: 'center',
        height: 50,
        backgroundColor: PINK_COLOR
    },
    buttonTextStyle: {
        padding: 10,
        color: WHITE_COLOR,
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});