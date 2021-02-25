import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCuU3RWNafKf7DP85GxSkForybARrnPHgE",
    authDomain: "crwn-db-e613d.firebaseapp.com",
    projectId: "crwn-db-e613d",
    storageBucket: "crwn-db-e613d.appspot.com",
    messagingSenderId: "325852148985",
    appId: "1:325852148985:web:826e0807dc9f38a1d25e28",
    measurementId: "G-Y182C8SBNM"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

     try {
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })
     } catch (error) {
       console.log('error creating user', error.message);
     }
     }

     return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider =  new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
