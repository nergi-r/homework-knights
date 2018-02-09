import { Asset, AppLoading } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './src/App';
import firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    const config = {
      apiKey: "AIzaSyAVushE_vgB5dyWG0iAsZGKvjKrAoq25vE",
      authDomain: "homework-knights.firebaseapp.com",
      databaseURL: "https://homework-knights.firebaseio.com",
      projectId: "homework-knights",
      storageBucket: "homework-knights.appspot.com",
      messagingSenderId: "737938770626"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

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