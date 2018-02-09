import firebase from 'firebase';
import _ from 'lodash';

export const fetchChallenges = (callback) => {
    firebase.auth().onAuthStateChanged((user) => {
        let promises = [];
        promises.push(firebase.database().ref(`/users/${user.uid}/answeredQuestions`).once('value'));
        promises.push(firebase.database().ref(`/challenges`).once('value'));
        return Promise.all(promises).then((snapshot) => {
            const answeredQuestions = snapshot[0].val() || {};
            // console.log(snapshot[0].val(), snapshot[1].val());
            let challenges = _.map(snapshot[1].val(), (val) => {
                return { ... val };
            });
            for(let i = 0; i < challenges.length; i++) {
                challenges[i].remainingGolds = 0;
                let questions = _.filter(challenges[i].questions, (val) => {
                    if(!answeredQuestions.hasOwnProperty(val.key)) {
                        challenges[i].remainingGolds += val.golds;
                        return { ...val };
                    }
                });
                challenges[i].questions = questions;
            }
            callback(challenges);
        });
    });
}

export const incrementGold = (golds) => {
    const { currentUser } = firebase.auth();
    return firebase.database().ref(`/users/${currentUser.uid}/golds`).transaction((currentValue) => {
        return currentValue + golds;
    });
}

export const removeQuestion = (question) => {
    const { currentUser } = firebase.auth();
    return firebase.database().ref(`/users/${currentUser.uid}/answeredQuestions/${question.key}`).set(true);
}
