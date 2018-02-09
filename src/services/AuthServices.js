import firebase from 'firebase';

export const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => { return user; })
        .catch((error) => {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => { return user; })
                .catch((error) => { throw error; });
        });
}