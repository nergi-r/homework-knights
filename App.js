import { Asset, AppLoading } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './src/App';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({
      isReady: true
    });
  }

  render() {
    if (!this.state.isReady) {
      return (<AppLoading/>);
    }
    else {
      return (
        <MainApp />
      );
    }
    
  }
}