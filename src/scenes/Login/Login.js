import React, { Component } from 'react';
import {
    View,
    Button,
} from 'react-native';
import {
    NavigationActions,
} from 'react-navigation';

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Test',
    })

    _goToHome = () => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main'})
          ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button
                    onPress={() => {
                        this._goToHome();
                    }}
                    title='Go' />
            </View>
        )
    }
}