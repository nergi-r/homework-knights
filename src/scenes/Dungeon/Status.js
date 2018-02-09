import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    StyleSheet, 
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { 
    WHITE_COLOR, 
    PINK_COLOR, 
    RED_COLOR,
} from '../../ColorHexa';
import { attackDragon } from '../../services';
import { Item, ItemText } from '../../components/Item/Item';
import Modal from 'react-native-modal';

export default class Status extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentWeapon: null,
            modalVisibility: false,
            isLoading: false,
        };
    }

    _weapons = [];

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

        this._weapons = [];
        nextProps.user.weapons.forEach(weapon => {
            if(weapon.count > 0)
                this._weapons.push(weapon);

            while(this._weapons%3)
                this._weapons.push({
                    empty: true,
                })
        })
    }

    onModalButtonClicked = () => {
        let flag = false;
        this.props.user.weapons.forEach(e => {
            if(e.count > 0) flag = true;
        });
        if(flag)
            this.setState({modalVisibility:true})
        else
            Alert.alert(
                'No weapons',
                'You don\'t have any weapon. You may want to go to Shop to purchase some weapons' 
            );
    };

    _handleWeaponSelected = (index) => {
        this.setState({
            currentWeapon: this._weapons[index],
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
                    onBackdropPress={()=> {
                        this.setState({modalVisibility:false});
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            padding: 0,
                        }}>
                        <FlatList
                            style={{flex: 1}}
                            renderItem={({item, index}) => {
                                if(item.empty){
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
                            data={this._weapons}
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

                {this.state.isLoading?
                    (
                        <ActivityIndicator
                            size="large"
                            style={{
                                width: 150,
                                alignSelf: 'center',
                            }}
                            color={WHITE_COLOR} />
                    )
                :
                    (
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isLoading: true,
                        })
                        attackDragon(this.state.currentWeapon, this.props.user, this.props.dragon)
                        .then(res => {
                            this.setState({
                                isLoading: false,
                            })
                        })
                    }}
                    style={[buttonStyle, (this.state.currentWeapon&&this.props.user.health>0&&styles.buttonStyleActive)||styles.buttonStyleInactive]}
                    disabled={this.state.currentWeapon === null || this.props.user.health <= 0}
                >
                    <Text style={buttonTextStyle}>{
                        (this.props.user.health <= 0 && 'NO HEALTH') ||
                        (this.state.currentWeapon === null && 'NO WEAPON') ||
                        'ATTACK'
                    }
                    </Text>
                </TouchableOpacity>
                    )
                }

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
    },
    buttonStyleActive: {
        backgroundColor: PINK_COLOR,
    },
    buttonStyleInactive: {
        backgroundColor: '#dddddd',
    },
    buttonTextStyle: {
        padding: 10,
        color: WHITE_COLOR,
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});