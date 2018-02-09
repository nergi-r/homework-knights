import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';

export default class TabIcon extends Component {
    render(){
        return(
            <View>
                <Image
                    source={this.props.source}
                    style={styles.img} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: 35,
        height: 35,
    }
})