import firebase from 'firebase';
import _ from 'lodash';

export const fetchRank = () => {
    return firebase.database().ref('/dragons').once('value')
        .then((snapshot) => {
            let rank = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid };
            });
            rank.sort((a, b) => { return b.currentLevel - a.currentLevel; });
            return rank;
        })
}