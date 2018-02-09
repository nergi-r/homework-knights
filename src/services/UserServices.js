import firebase from 'firebase';

export const fetchUser = (callback) => {
    firebase.auth().onAuthStateChanged((user) => {
        return firebase.database().ref(`/users/${user.uid}`).on('value', (snapshot) => {
            let user = snapshot.val();
            let promises = [];
            for(let id in user.weapons) {
                promises.push(firebase.database().ref(`/weapons/${id}`).once('value'));
            }
            for(let id in user.potions) {
                promises.push(firebase.database().ref(`/potions/${id}`).once('value'));
            }

            return Promise.all(promises).then((snapshot) => {
                let weapons = [];
                let potions = [];
                let index = 0;
                for(let id in user.weapons) {
                    weapons.push(snapshot[index].val());
                    weapons[index].count = user.weapons[id];
                    index++;
                }
                index = 0;
                for(let id in user.potions) {
                    potions.push(snapshot[weapons.length + index].val());
                    potions[index].count = user.potions[id];
                    index++;
                }
                user.weapons = weapons;
                user.potions = potions;
                return user;
            })
            .then((user) => callback(user));
        });
    })
}

export const usePotion = async(potion) => {
    const { currentUser } = firebase.auth();
    await firebase.database().ref(`/users/${currentUser.uid}/potions/${potion.name}`).transaction((currentValue) => {
        return currentValue - 1;
    })
    await firebase.database().ref(`/users/${currentUser.uid}/health`).transaction((currentValue) => {
        return currentValue + potion.heal;
    })
}