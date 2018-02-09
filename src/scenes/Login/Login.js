import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { GREEN_COLOR } from '../../ColorHexa';

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Login',
        header: null
    })

    componentDidMount() {
        console.ignoredYellowBox = [
          'Setting a timer'
        ];
        this.setState({ isLoading: true });
        AsyncStorage.getItem('store:auth')
            .then((auth) => {
                if(auth !== null) return this._goToHome();
                this.setState({ loading: false });
            })
    }

    _goToHome = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'home'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        const { container, logoContainer } = styles;
        const { navigate } = this.props.navigation;

        return(
            <View style={container}>
                <Image source={require('../../assets/splash-screen/splash-logo.png')}
                        style={logoContainer} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREEN_COLOR,
        justifyContent: 'center'
    },
    logoContainer: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
});