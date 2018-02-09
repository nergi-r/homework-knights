import firebase from 'firebase';
import _ from 'lodash';

export const fetchChallenges = (callback) => {
    return firebase.database().ref(`/challenges`).once('value', (snapshot) => {
        let challenges = _.map(snapshot.val(), (val) => {
            return { ...val };
        });
        callback(challenges);
    });
}

export const incrementGold = (golds) => {
    const { currentUser } = firebase.auth();
    return firebase.database().ref(`/users/${currentUser.uid}/golds`).transaction((currentValue) => {
        return currentValue + golds;
    });
}