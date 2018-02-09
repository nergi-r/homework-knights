import { StyleSheet } from 'react-native';
import { 
    BLACK_COLOR, 
    WHITE_COLOR, 
} from '../ColorHexa'; 

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: BLACK_COLOR,
    },
    headerShadowlessStyle: {
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTitleStyle: {
        color: WHITE_COLOR,
    },
    container: {
        flex: 1,
    }
});

export default styles;