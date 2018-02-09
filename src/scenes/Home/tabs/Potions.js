import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
} from 'react-native';
import MS from '../../Styles';
import { Item, ItemText } from '../../../components/Item/Item';
import { usePotion } from '../../../services';

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
                    text={item.heal}
                    source={require('../../../assets/heart.png')} />
                <ItemText
                    text={`x${item.count}`} />
            </Item>
        )
    }

    _handleItemSelected = (index) => {
        usePotion(this._potions[index]);
    }

    _potions = [];

    render(){
        this._potions = [];
        if(this.props.screenProps&&this.props.screenProps.potions){
            this.props.screenProps.potions.forEach(e => {
                if(e.count>0) this._potions.push(e);
            });
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