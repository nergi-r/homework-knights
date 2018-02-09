import firebase from 'firebase';

export const fetchWeapons = () => {
    return firebase.database().ref('/weapons').once('value');
}

export const buyWeapon = async (uid, price) => {
    const { currentUser } = firebase.auth();
    return firebase.database().ref(`/users/${currentUser.uid}/golds`).once('value')
        .then(async (snapshot) => {
            if(snapshot.val() < price) return false;

            firebase.database().ref(`/users/${currentUser.uid}/golds`).transaction((currentValue) => {
                return currentValue - price;
            })

            firebase.database().ref(`/users/${currentUser.uid}/weapons/${uid}`).transaction((currentValue) => {
                return currentValue + 1;
            })

            return true;
        })
}

export const fetchPotions = () => {
    return firebase.database().ref('/potions').once('value');
}

export const buyPotion = async (uid, price) => {
    const { currentUser } = firebase.auth();
    return firebase.database().ref(`/users/${currentUser.uid}/golds`).once('value')
        .then(async (snapshot) => {
            if(snapshot.val() < price) return false;

            firebase.database().ref(`/users/${currentUser.uid}/golds`).transaction((currentValue) => {
                return currentValue - price;
            })

            firebase.database().ref(`/users/${currentUser.uid}/potions/${uid}`).transaction((currentValue) => {
                return currentValue + 1;
            })

            return true;
        })
}