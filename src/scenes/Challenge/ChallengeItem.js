import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
} from 'react-native';
import { RED_COLOR, WHITE_COLOR } from '../../ColorHexa';

const challengeItem = (props) => {
	return (
		<TouchableOpacity onPress={props.onItemTouched}>
			<View style={styles.mainContainer}>
				<Image style={styles.challengeIcon} source={{uri: props.itemInfo.icon}} />
				<View style={styles.challengeText}>
					<Text style={styles.challengeName}>{props.itemInfo.name}</Text>
					<View style={styles.goldContainer}>
						<Image style={styles.goldImage} source={require('../../assets/gold.png')} />
						<Text style={styles.goldText}>{props.itemInfo.remainingGolds} remaining golds</Text>
					</View>
				</View>
				<Image style={styles.rightArrowIcon} source={require('../../assets/right-arrow.png')}/>
			</View>
		</TouchableOpacity>

	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: WHITE_COLOR,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 16,
		paddingBottom: 16
	},
	challengeIcon: {
		width: 80,
		height: 80
	},
	challengeText: {
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	challengeName: {
		color: RED_COLOR,
		fontSize: 20
	},
	goldContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	goldImage: {
		width: 24,
		height: 24,
	},
	goldText: {
		marginLeft: 8
	},
	rightArrowIcon: {
		
	}

});

export default challengeItem;