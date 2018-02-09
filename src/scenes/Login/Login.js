import React, { Component } from 'react';
import {
    View,
    Button,
} from 'react-native';

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Test',
    })

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button
                    onPress={() => navigate('Main')}
                    title='Go' />
            </View>
        )
    }
}