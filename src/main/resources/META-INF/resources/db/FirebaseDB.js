class FirebaseDB {

  firebaseConfig = {
    apiKey: "AIzaSyAF7PNkbLWdnc0POi-ZKUziKkm32ovU394",
    authDomain: "cabal-6d74d.firebaseapp.com",
    databaseURL: "https://cabal-6d74d.firebaseio.com",
    projectId: "cabal-6d74d",
    storageBucket: "cabal-6d74d.appspot.com",
    messagingSenderId: "684906802868",
    appId: "1:684906802868:web:b7daa0cacb83cfc2f671e1",
    measurementId: "G-03G5QRDENW"
  };
  provider = new firebase.auth.GoogleAuthProvider();
  user;
  db;
  constructor() {

    firebase.initializeApp(this.firebaseConfig);
    this.db = firebase.firestore();
    window.log = function(message) {
      this.db.collection('log').add(message).then();
    }

    document.addEventListener('save', cms => {
      window.doc.body = document.querySelector("#cms").innerHTML;
      this.setDocument();
    });
    document.addEventListener('signIn', cms => {
      this.signIn();
    });
  }

  signIn() {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert("Sign-out successful. TODO REMOVE ALERT");
      })
      .catch(function(error) {
        alert("Sign-out: An error happened.. TODO REMOVE ALERT");
      });
  }
  async checkIfSignedIn() {
    this.user = await firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          alert("Sign-in successful. TODO REMOVE ALERT");
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        }
        return result.user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        alert(`Sign-in: An error happened. 
        errorCode: ${errorCode}
        errorMessage: ${errorMessage}
        email: ${email}
        credential: ${credential}
        TODO REMOVE ALERT`);
      });
      return this.user;
  }

  async getDocuments() {
    const snapshot = await firebase.firestore().collection('cms').get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getDocument() {
    return this.db.collection('cms').doc(document.title).get().then(d=>d.data());
  }

  async setDocument() {
    return this.db.collection('cms').doc(document.title).set(window.doc).then(d=>d);
  }


}
