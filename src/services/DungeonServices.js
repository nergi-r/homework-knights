import firebase from 'firebase';
import _ from 'lodash';

export const fetchDragon = (callback, uid) => {
    uid = uid.replace(/\s/g, '');
    return firebase.database().ref(`/dragons/${uid}`).on('value', (snapshot) => {
        let dragon = snapshot.val();
        let lastAttack = _.map(dragon.lastAttack, (val) => {
            return { ...val };
        });
        dragon.lastAttack = lastAttack.reverse().slice(0, 10);
        callback(dragon);
    })
}

export const attackDragon = (weapon, user, dragon) => {
    console.log(weapon, dragon, user);
    // firebase.database().ref(`/dragons/${dragon.`)
}