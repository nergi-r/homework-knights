import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import ChallengeList from './ChallengeList';
import { RED_COLOR, BLACK_COLOR, WHITE_COLOR } from '../../ColorHexa';
import MS from '../Styles';
import TabIcon from '../../components/TabIcon';
import {
    TabNavigator
} from 'react-navigation';

export default class Challenge extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Challenges',
        headerStyle: [
            MS.headerStyle, 
            MS.headerShadowlessStyle
        ],
        headerTitleStyle: MS.headerTitleStyle,
        tabBarIcon: (
            <TabIcon
                source={require('../../assets/menu/challenges.png')} />
        ),
    })

    constructor(props) {
        super(props);
        this.state = {
            challenges : [
                {
                    key: 1,
                    name: 'Mathematics',
                    icon: require('../../assets/subjects/mathematics.png'),
                    remainingGolds: 150, 
                    questions: [
                        {
                            image: require('../../assets/subjects/math-questions.png'),
                            description: 'Panjang AC adalah...',
                            choices: ['22 cm','24 cm','17 cm','18 cm'],
                            answerIndex: 1
                        },
                        {
                            image: require('../../assets/subjects/math-questions.png'),
                            description: 'Panjang AC sekarang adalah ...',
                            choices: ['24 cm','22 cm','17 cm','18 cm'],
                            answerIndex: 0
                        },
                    ]
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
        var selectedChallenge = this.state.challenges.find((challenge) => {
            return (challenge.key===key);
        });
        this.props.navigation.navigate('Quiz',selectedChallenge);
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