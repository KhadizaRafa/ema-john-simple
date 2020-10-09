import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireabse.config';

export const firebaseInitialize = () => {
    if(firebase.apps.length === 0)
     firebase.initializeApp(firebaseConfig)
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(response => {
      const { displayName, photoURL, email } = response.user;
      const singedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      return singedInUser;
    })
    .catch(error => {
      console.log(error);
      console.log(error.message)
    })
}

export   const handleSignOut = () => {
    const singedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      photo: '',
    }
    return firebase.auth().signOut()
      .then(() => {
        return singedOutUser;
      }).catch(function (error) {
        console.log(error)
      });
  }

export const createUserWithEmailAndPassword = (name,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response)
      updateUserName(name);
      return (true, '');  
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      return (false, errorMessage)
    });
  }


  export const signInWithEmailAndPassword = (email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      return (true, '')
    })
    .catch(function (error) {
      var errorMessage = error.message;
      return (false, errorMessage)
    });
  }

export   const handleFbLogin = ()=> {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function(result) {
      
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      return user;
      console.log('fb login',user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }


export   const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
     
    }).then(function () {
      console.log('User updated successfully')
    }).catch(function (error) {
      console.log(error)
    });
  }