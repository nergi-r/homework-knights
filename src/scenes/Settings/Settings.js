import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {
    NavigationActions,
} from 'react-navigation';

import MS from '../Styles';

import { 
    GREY_COLOR, 
    WHITE_COLOR, 
} from '../../ColorHexa'; 

export default class Settings extends Component {

    constructor(props){
        super(props);
        this._handleRenderItem = this._handleRenderItem.bind(this);
        this._handleMenuSelected = this._handleMenuSelected.bind(this);
    }
    
    static navigationOptions = ({navigation}) => ({
        title: 'Settings',
        headerStyle: MS.headerStyle,
        headerTintColor: WHITE_COLOR,
    });

    _menus = [
        {
            text: 'Logout',
            id: 'logout',
        },
        {
            text: 'Stuff',
            id: 'stuff',
        }
    ]

    _handleRenderItem = (item) => {
        console.log(item);
        return(
            <TouchableOpacity
                onPress={() => this._handleMenuSelected(item.id)}
                style={styles.menuContainer}>
                <View
                    style={styles.menuContainer}>
                    <Text
                        style={styles.menuText}>
                        {item.text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _handleMenuSelected = (id) => {
        alert(id)
    }

    render(){
        return(
            <View
                style={[MS.container, styles.container]}>
                <FlatList
                    data={this._menus}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this._handleRenderItem}
                    style={MS.container}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GREY_COLOR,
    },
    menuContainer: {
        backgroundColor: WHITE_COLOR,
        borderBottomWidth: 1,
        borderBottomColor: GREY_COLOR,
        padding: 5,
        flex: 1,
    },
    menuText: {
        color: '#000000',
    },
});