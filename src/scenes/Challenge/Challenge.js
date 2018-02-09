import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import ChallengeList from './ChallengeList';
import { RED_COLOR } from '../../ColorHexa';

export default class Challenge extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Challenges',
    })

    constructor(props) {
        super(props);
        this.state = {
            challenges : [
                {
                    key: 1,
                    name: 'Mathematics',
                    icon: require('../../assets/subjects/mathematics.png'),
                    remainingGolds: 150
                },
                {
                    key: 2,
                    name: 'Chemistry',
                    icon: require('../../assets/subjects/chemistry.png'),
                    remainingGolds: 250
                },
                {
                    key: 3,
                    name: 'Physics',
                    icon: require('../../assets/subjects/physics.png'),
                    remainingGolds: 250
                },
                {
                    key: 4,
                    name: 'Biology',
                    icon: require('../../assets/subjects/biology.png'),
                    remainingGolds: 0
                },
            ],
        };
    }

    onChallengeSelectedHandler = (key) => {
        console.log(key + " is selected");
    };

    render(){
        return(
            <View style={styles.container}>
                <ChallengeList
                    challenges={this.state.challenges}
                    onItemSelected={(key)=> this.onChallengeSelectedHandler(key)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: RED_COLOR
    }
});