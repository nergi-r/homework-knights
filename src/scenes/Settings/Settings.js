import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    AsyncStorage,
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
            text: 'About',
            id: 'about',
        }
    ]

    _handleRenderItem = (item) => {
        return(
            <TouchableOpacity
                onPress={() => this._handleMenuSelected(item.item.id)}>
                <View
                    style={styles.menuContainer}>
                    <Text
                        style={styles.menuText}>
                        {item.item.text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _handleMenuSelected = (id) => {
        if(id=='logout'){
            Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {}
                    },
                    {
                        text: 'Logout',
                        onPress: () => {
                            AsyncStorage.removeItem('store:auth')
                            .then(() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Login'})
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            })
                            .catch(err => {
                                Alert.alert(
                                    'Uh...',
                                    'Something is wrong',
                                );
                            })
                        }
                    },
                ]
            )
        }
        else if(id=='about'){
            Alert.alert(
                'About',
                'This software is created by: \n' +
                'Albert Darmawan\n' +
                'Nergi Rahardi\n' + 
                'Sena Candra MPC\n\n' + 
                'For Hackavidia 2018'
            );
        }
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
        padding: 15,
        flex: 1,
    },
    menuText: {
        color: '#000000',
        fontSize: 16,
    },
});