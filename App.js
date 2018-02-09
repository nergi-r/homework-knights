import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './src/App';
import firebase from 'firebase';

export default class App extends React.Component {
  componentWillMount() {
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
  }

  render() {
    return (
      <MainApp />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
