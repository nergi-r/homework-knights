import React, { Component } from 'react';
import {
	View,
	FlatList,
} from 'react-native';
import ChallengeItem from './ChallengeItem';

const challengeList = (props) => {
	return (
		<View>
			<FlatList
				data={props.challenges}
				renderItem={(info)=> (	
					<ChallengeItem
						itemInfo={info.item}
						onItemTouched={() => props.onItemSelected(info.item.key)}
					/>
				)}
			>
			</FlatList>
		</View>
	);
};

export default challengeList;