import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
} from 'react-native';
import MS from '../../Styles';
import { Item, ItemText } from '../../../components/Item/Item';

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
                source={item.source}
                index={index}
                onPress={this._handleItemSelected}>
                <ItemText
                    text={`x${item.count}`} />
            </Item>
        )
    }

    _handleItemSelected = (index) => {
        alert(index);
    }

    render(){
        var weapons = [];
        if(this.props.screenProps&&this.props.screenProps.weapons){
            weapons = this.props.screenProps.weapons.slice();
            while(weapons.length%3){
                weapons.push({
                    empty: true,
                })
            }
        }
        return(
            <FlatList
                data={weapons}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
                style={{flex: 1,}}
                numColumns={3} />
        );
    }
}