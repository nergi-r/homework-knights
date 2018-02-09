import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Animated,
	Alert
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TimerCountdown from 'react-native-timer-countdown';
import { GREEN_COLOR, BLACK_COLOR, WHITE_COLOR } from '../../ColorHexa';
import MS from '../Styles';
import { incrementGold } from '../../services';

export default class Quiz extends Component {
	static navigationOptions = ({navigation}) => ({
		title: navigation.state.params.name,
        headerStyle: [
            MS.headerStyle, 
            MS.headerShadowlessStyle
        ],
        headerTitleStyle: MS.headerTitleStyle,
    });

	constructor(props) {
		super(props);
		this.state = {
			fadeAnimCorrect: new Animated.Value(0),
			fadeAnimWrong: new Animated.Value(0),
			currentTimeRemaining: 15000,
		};
	};

	onAllSwipedHandler = ()=> {
		Alert.alert(
			'No More Question',
			'We have no more question for you, at least for now!', 
			[
				{
					text: 'Ok',
					onPress: ()=> {this.props.navigation.goBack()}
				}
			]
		);
	};

	onSwipeLeftMechanism = ()=> {
		Animated.sequence([
			Animated.timing(this.state.fadeAnimWrong, {toValue: 1, duration: 100}),
			Animated.timing(this.state.fadeAnimWrong, {toValue: 0, duration: 100}),
		]).start();
		this.swiper.swipeLeft();
		this.setState({
			currentTimeRemaining: 15000
		});
	};

	onSwipeRightMechanism = ()=> {
		Animated.sequence([
			Animated.timing(this.state.fadeAnimCorrect, {toValue: 1, duration: 100}),
			Animated.timing(this.state.fadeAnimCorrect, {toValue: 0, duration: 100}),
		]).start();
		this.swiper.swipeRight();
		this.setState({
			currentTimeRemaining: 15000
		});
	};

	onAnswered = (choiceIndex, correctAnswerIndex, golds)=> {
		if (choiceIndex === correctAnswerIndex) {
			this.onSwipeRightMechanism();
			incrementGold(golds);
		}
		else {
			this.onSwipeLeftMechanism();
		}
	};

	onTimeOutHandler = () => {
		this.onSwipeLeftMechanism();
	};

	render() {
		return (
			<View style={styles.container}>
		        <Swiper
		        	ref={swiper => {
			        	this.swiper = swiper
			        }}
		            cards={this.props.navigation.state.params.questions}
		            renderCard={(question) => {
		                return (
		                    <View style={styles.questionCard}>
		                    	<Image style={styles.questionImage} source={{uri: question.image}} />
		                    	<Text style={styles.questionText} >{question.description}</Text>
		                    	<View style={styles.questionChoicesContainer}>
		                    		<TouchableOpacity 
		                    			style={styles.questionChoiceButton} 
		                    			onPress={()=> {this.onAnswered(0,question.answerIndex, question.golds)}}>
		                    			<Text style={styles.questionChoiceButtonText}>
		                    			{question.choices[0]}
		                    			</Text>
		                    		</TouchableOpacity>
		                    		<TouchableOpacity 
		                    			style={styles.questionChoiceButton} 
		                    			onPress={()=> {this.onAnswered(2,question.answerIndex, question.golds)}}>
		                    			<Text style={styles.questionChoiceButtonText}>
		                    			{question.choices[2]}
		                    			</Text>
		                    		</TouchableOpacity>
		                    	</View>
		                    	<View style={styles.questionChoicesContainer}>
		                    		<TouchableOpacity 
		                    			style={styles.questionChoiceButton} 
		                    			onPress={()=> {this.onAnswered(1,question.answerIndex, question.golds)}}>
		                    			<Text style={styles.questionChoiceButtonText}>
		                    			{question.choices[1]}
		                    			</Text>
		                    		</TouchableOpacity>
		                    		<TouchableOpacity 
		                    			style={styles.questionChoiceButton} 
		                    			onPress={()=> {this.onAnswered(3,question.answerIndex, question.golds)}}>
		                    			<Text style={styles.questionChoiceButtonText}>
		                    			{question.choices[3]}
		                    			</Text>
		                    		</TouchableOpacity>
		                    	</View>
		                    	<View style={styles.questionMarksContainer}>
		                    		<Animated.Image 
		                    			style={ {opacity: this.state.fadeAnimWrong } } 
		                    			source={ require('../../assets/wrong.png')} />
		                    		<Animated.Image 
		                    			style={ {opacity: this.state.fadeAnimCorrect }}
		                    			source={require('../../assets/correct.png')} />
		                    	</View>
		                    </View>
		                )
		            }}
		            onSwipedAll={() => {this.onAllSwipedHandler()}}
		            horizontalSwipe={false}
		            verticalSwipe={false}
		            cardIndex={0}
		            backgroundColor={GREEN_COLOR}>
		        </Swiper>
		        <View style={styles.timerContainer}>
			      	<TimerCountdown
			            initialSecondsRemaining={this.state.currentTimeRemaining}
			            onTimeElapsed={() => this.onTimeOutHandler()}
			            allowFontScaling={true}
			            style={styles.timerText}
			        />
				</View>
		    </View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	questionCard: {
	    flex: 1,
	    borderRadius: 4,
	    borderWidth: 2,
	    borderColor: '#E8E8E8',
	    backgroundColor: WHITE_COLOR,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'center'
	},
	questionImage: {
		height: 150,
		width: 150,
		resizeMode: 'contain'
	},
	questionText: {
		fontSize: 25,
		marginTop: 16,
		marginBottom: 16,
	},
	questionChoicesContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	questionChoiceButton: {
		margin: 10,
		paddingLeft: 32,
		paddingRight: 32,
		paddingTop: 16,
		paddingBottom: 16,
		backgroundColor: GREEN_COLOR,
	},
	questionChoiceButtonText: {
		color: WHITE_COLOR,
		fontSize: 20,
	},
	questionMarksContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	timerContainer: {
		marginTop: 5,
		marginBottom: 5,
		padding: 5,
	},
	timerText: {
		fontSize: 30,
		color: WHITE_COLOR,
	},

});