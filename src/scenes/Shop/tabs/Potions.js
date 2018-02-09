import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    Alert,
} from 'react-native';
import MS from '../../Styles';
import { Item, ItemText } from '../../../components/Item/Item';
import { buyPotion } from '../../../services';

export default class Potions extends Component {

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
                    source={require('../../../assets/heart.png')}
                    text={`+${item.heal}`} />
                <ItemText
                    source={require('../../../assets/gold.png')}
                    text={`${item.price}`} />
            </Item>
        )
    }

    _handleItemSelected = (index) => {
        Alert.alert(
            'Purchase',
            'Are you sure you want to purchase ' + this._potions[index].displayName + ' for ' + this._potions[index].price + ' golds?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { }
                },
                {
                    text: 'Purchase',
                    onPress: () => {
                        buyPotion(this._potions[index].name, this._potions[index].price)
                        .then(res => {
                            var result = '';
                            if(res){
                                result = this._potions[index].displayName + ' has been purchased!';
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

    _potions = []

    render(){
        this._potions = [];
        if(this.props.screenProps&&this.props.screenProps.potions){
            this._potions = this.props.screenProps.potions.slice();
            while(this._potions.length%3){
                this._potions.push({
                    empty: true,
                })
            }
        }
        return(
            <FlatList
                data={this._potions}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
                style={{flex: 1,}}
                numColumns={3} />
        );
    }
}