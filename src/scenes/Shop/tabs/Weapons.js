import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    Alert,
} from 'react-native';
import MS from '../../Styles';
import { Item, ItemText } from '../../../components/Item/Item';
import { buyWeapon } from '../../../services';

export default class Weapons extends Component {

    constructor(props){
        super(props);
        this._handleItemSelected = this._handleItemSelected.bind(this);
    }

    _renderItem = ({item, index}) => {
        if(item.empty){
            return(
                <View
                    style={{
                        flex: 1,
                    }} />
            );
        }
        return(
            <Item
                source={{uri: item.photoURL}}
                index={index}
                onPress={this._handleItemSelected}>
                <ItemText
                    text={item.displayName}
                    textStyle={{
                        fontWeight: 'bold',
                    }} />
                <ItemText
                    text={`${item.minDamage} - ${item.maxDamage}`}
                    source={require('../../../assets/weapons/sword.png')}
                    imageStyle={{
                        width: 10,
                    }} />
                <ItemText
                    source={require('../../../assets/gold.png')}
                    text={`${item.price}`} />
            </Item>
        )
    }

    _handleItemSelected = (index) => {
        Alert.alert(
            'Purchase',
            'Are you sure you want to purchase ' + this._weapons[index].displayName + ' for ' + this._weapons[index].price + ' golds?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { }
                },
                {
                    text: 'Purchase',
                    onPress: () => {
                        buyWeapon(this._weapons[index].name, this._weapons[index].price)
                        .then(res => {
                            var result = '';
                            if(res){
                                result = this._weapons[index].displayName + ' has been purchased!';
                            }
                            else {
                                result = 'Insufficient gold';
                            }
                            Alert.alert(
                                'Purchase',
                                result,
                            );
                        })
                    }
                }
            ]
        )
    }

    _weapons = [];

    render(){
        this._weapons = [];
        if(this.props.screenProps&&this.props.screenProps.weapons){
            this._weapons = this.props.screenProps.weapons.slice();
            while(this._weapons.length%3){
                this._weapons.push({
                    empty: true,
                })
            }
        }
        return(
            <FlatList
                data={this._weapons}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
                style={{flex: 1,}}
                numColumns={3} />
        );
    }
}