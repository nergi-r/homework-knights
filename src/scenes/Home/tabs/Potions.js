import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
} from 'react-native';
import MS from '../../Styles';
import { Item, ItemText } from '../../../components/Item/Item';

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
                    text={`( x${item.count} )`} />
            </Item>
        )
    }

    _handleItemSelected = (index) => {
        alert(index);
    }

    render(){
        var potions = [];
        if(this.props.screenProps&&this.props.screenProps.potions){
            this.props.screenProps.potions.forEach(e => {
                if(e.count>0) potions.push(e);
            });
            while(potions.length%3){
                potions.push({
                    empty: true,
                })
            }
        }
        return(
            <FlatList
                data={potions}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
                style={{flex: 1,}}
                numColumns={3} />
        );
    }
}