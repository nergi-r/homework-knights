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
                source={item.source}
                index={index}
                onPress={this._handleItemSelected}>
                <ItemText
                    source={require('../../../assets/heart.png')}
                    text={`+${item.health}`} />
                <ItemText
                    source={require('../../../assets/gold.png')}
                    text={`${item.price}`} />
            </Item>
        )
    }

    _handleItemSelected = (index) => {
        alert(index);
    }

    render(){
        var potions = [];
        if(this.props.screenProps&&this.props.screenProps.potions){
            potions = this.props.screenProps.potions.slice();
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