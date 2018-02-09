import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { GREEN_COLOR, WHITE_COLOR, PINK_COLOR } from '../../ColorHexa';
import { login } from '../../services';

export default class Login extends Component {
    state = {
        isLoading: false
    };

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
                this.setState({ isLoading: false });
            })
    }

    _goToHome = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    _handleLogin = () => {
        this.setState({ isLoading: true });
        login(this.state.email, this.state.password)
            .then((user) => {
                if(user !== null) {
                    AsyncStorage.setItem('store:auth', user.uid);
                    return this._goToHome();
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                alert(error);
            })
    }

    render(){
        const { container, logoContainer, buttonStyle, buttonTextStyle } = styles;
        const { navigate } = this.props.navigation;

        return(
            <View style={container}>
                <Image source={require('../../assets/splash-screen/splash-logo.png')}
                        style={logoContainer} />
                <View>
                    <TextInput
                        onChangeText={(email) => this.setState({email})}
                        placeholder={'Email'}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        style={styles.textInputStyle}
                    />

                    <TextInput
                        onChangeText={(password) => this.setState({password})}
                        placeholder={'Password'}
                        secureTextEntry
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        style={styles.textInputStyle}
                    />

                    <View style={{width: '70%', alignSelf: 'center'}}>
                        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                            <Text style={{color: WHITE_COLOR}}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.state.isLoading
                    ?   <ActivityIndicator size='large' style={{marginTop: 20}} />
                    :   <TouchableOpacity style={buttonStyle}
                            onPress={this._handleLogin}
                        >
                            <Text style={buttonTextStyle}>Login</Text>
                        </TouchableOpacity>
                }
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
    },
    textInputStyle: {
        fontSize: 16,
        color: '#000',
        backgroundColor: WHITE_COLOR,
        margin: 2,
        alignSelf: 'center',
        height: 50,
        width: 250,
        padding: 10
    },
    buttonStyle: {
        marginTop: 20,
        width: '50%',
        alignSelf: 'center',
        height: 50,
        backgroundColor: PINK_COLOR,
    },
    buttonTextStyle: {
        padding: 10,
        color: WHITE_COLOR,
        alignSelf: 'center',
        fontSize: 18
    }
});