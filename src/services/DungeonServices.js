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

export const attackDragon = async (weapon, user, dragon) => {
    const uid = dragon.className.replace(/\s/g, '');
    const { currentUser } = firebase.auth();
    const damage = Math.floor(Math.random() * (weapon.maxDamage - weapon.minDamage) + weapon.minDamage);
    const minDamage = dragon.currentLevel * 5;
    const maxDamage = dragon.currentLevel * 10 + 1;
    const damageFromDragon = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);

    await firebase.database().ref(`/dragons/${uid}/health`).transaction((currentValue) => {
        return Math.max(0, currentValue - damage);
    })

    if(dragon.health - damage <= 0) {
        await firebase.database().ref(`/dragons/${uid}/currentLevel`).transaction((currentValue) => {
            return currentValue + 1;
        })
        await firebase.database().ref(`/dragons/${uid}/health`).set((dragon.currentLevel + 1) * 10000);
    }

    await firebase.database().ref(`/dragons/${uid}/lastAttack`).push({ photoURL: user.photoURL });

    await firebase.database().ref(`/users/${currentUser.uid}/weapons/${weapon.name}`)
        .transaction((currentValue) => { return currentValue - 1; });

    await firebase.database().ref(`/users/${currentUser.uid}/health`).transaction((currentValue) => {
        return Math.max(0, currentValue - damageFromDragon);
    })

    return true;
}