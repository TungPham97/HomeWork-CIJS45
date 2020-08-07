"use strict";
const init = () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBf7p6u9YNudKvN-zTbISnXPA0dRfMOc3o",
    authDomain: "chat-app-441f0.firebaseapp.com",
    databaseURL: "https://chat-app-441f0.firebaseio.com",
    projectId: "chat-app-441f0",
    storageBucket: "chat-app-441f0.appspot.com",
    messagingSenderId: "237489374051",
    appId: "1:237489374051:web:ae89452c058f00cadc0956"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firestoreFunction();
  console.log(firebase.app().name);
  model.chat();
  // view.setActiveScreen('registerScreen');
}

window.onload = init;

const firestoreFunction = async () => {

  // get one document
  const documentId = '2d8Nl8U2ZDbiGMuDl03t';
  const response = await firebase.firestore()
    .collection('users')
    .doc(documentId)
    .get()

  const user = getDataFromDoc(response);
  console.log(response);

  // get many document
  const response2 = await firebase.firestore().collection('users').where('phoneNumber', 'array-contains', 12).get();
  const listUser = getDataFromDocs(response2.docs);
  console.log(listUser);

  // add document
  const userToAdd = {
    name: 'Nguyễn Thị',
    age: -1,
  };
  // firebase.firestore().collection('users').add(userToAdd);

  // update document
  const documentIdUpdate = 'ocW4KIq70WTt28gpZ4Cg';
  const dataToUpdate = {
    age: 99,
    email: 'adsf',
    phone: firebase.firestore.FieldValue.arrayUnion(32323)
  }
  firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate);
  // delete document
  const documentIdDelete = 'ocW4KIq70WTt28gpZ4Cg';
  firebase.firestore().collection('users').doc(documentIdDelete).delete();
}

// Get data from docs
const getDataFromDocs = (docs) => {
  const datas = docs.map((doc) => getDataFromDoc(doc));
  return datas
}

// Get data from doc
const getDataFromDoc = (doc) => {
  const data = doc.data();
  data.id = doc.id;
  return data;
}

