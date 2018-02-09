import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { WHITE_COLOR, PINK_COLOR, RED_COLOR } from '../../ColorHexa';
import { attackDragon } from '../../services';
import { Item, ItemText } from '../../components/Item/Item';
import Modal from 'react-native-modal';

export default class Status extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentWeapon: null,
            modalVisibility: false,
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

    onModalButtonClicked = () => {
        if(this.props.user.weapons.length <= 0){
            Alert.alert(
                'No weapons',
                'You have no weapon. You may want to check the shop and buy some weapon.'
            );
        }
        this.setState({
            modalVisibility : true
        });
    };

    _handleWeaponSelected = (index) => {
        this.setState({
            currentWeapon: this.props.user.weapons[index],
            modalVisibility: false,
        });
    }

    render() {
        const { container, healthContainer, weaponContainer } = styles;
        const { healthStyle, healthTextStyle, buttonStyle, buttonTextStyle, weaponStyle } = styles;

        return (
            <View style={container}>
                <Modal 
                    isVisible={this.state.modalVisibility}
                    onBackdropPress={()=> this.setState({modalVisibility:false})}
                    onBackButtonPress={() => this.setState({ modalVisibility: false })}
                >
                    <View
                        style={{
                            flex: 1,
                            padding: 0,
                        }}>
                        <FlatList
                            style={{flex: 1}}
                            renderItem={({item, index}) => {
                                if(item.count === 0){
                                    return(<View style={{flex: 1}}></View>);
                                }
                                return (
                                <Item
                                    source={{uri: item.photoURL}}
                                    index={index}
                                    onPress={this._handleWeaponSelected}>
                                    <ItemText
                                        text={item.displayName}
                                        textStyle={{
                                            fontWeight: 'bold',
                                        }} />
                                    <ItemText
                                        text={`${item.minDamage}-${item.maxDamage}`}
                                        source={require('../../assets/weapons/sword.png')}
                                        imageStyle={{
                                            width: 10,
                                        }} />
                                    <ItemText
                                        text={`x${item.count}`} />
                                </Item>
                                )
                            }}
                            data={this.props.user.weapons}
                            keyExtractor={(item, index) => index}
                            numColumns={3}>
                        </FlatList>
                    </View>
                </Modal>
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
                    disabled={this.state.currentWeapon === null}
                >
                    <Text style={buttonTextStyle}>ATTACK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={weaponContainer} onPress={()=> {this.onModalButtonClicked();}}>
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