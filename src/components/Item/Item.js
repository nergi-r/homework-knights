import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { WHITE_COLOR } from '../../ColorHexa';

export class Item extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
        Dimensions.addEventListener('change', this._handleWindowChange);
    }

    componentDidMount = () => {
        this._handleWindowChange();
    }

    _handleWindowChange = () => {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    render(){
        return(
            <TouchableOpacity
                style={{
                    flex: 1
                }}
                onPress={() => this.props.onPress(this.props.index)} >
                <View
                    style={[
                        styles.container,
                        {
                            width: this.state.width/3-10,
                        }
                    ]}>
                    <Image
                        source={this.props.source}
                        style={[
                            styles.image,
                            {
                                width: this.state.width/3-20,
                                height: this.state.width/3-20,
                            },
                        ]} />
                    {this.props.children}
                </View>
            </TouchableOpacity>
        )
    }
}

export class ItemText extends PureComponent {
    render(){
        return(
            <View
                style={styles.itemContainer}>
                <Image
                    source={this.props.source}
                    style={[styles.itemImage, this.props.imageStyle]} />
                <Text
                    style={[styles.itemText, this.props.textStyle]}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        margin: 5,
        marginTop: 10,
        padding: 10,
    },
    image: {
        resizeMode: 'contain',
        marginBottom: 5,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    itemImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 5,
    },
    itemText: {
        fontSize: 18,
        color: WHITE_COLOR,
    }
})