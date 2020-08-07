const model = {};
model.currentUser = undefined;
model.conversations = undefined;
model.currentConversation = undefined;
model.collectionName = 'conversations';

model.register = async (email, password, firstName, lastName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    firebase.auth().currentUser.updateProfile({
      displayName: firstName + ' ' + lastName
    })
    firebase.auth().currentUser.sendEmailVerification()
    alert('The email has been registered, please check your email!');
    view.setActiveScreen('loginScreen');
  } catch (err) {
    alert(err.message);
  }

  // Promise
  // .then((res) => {
  //   firebase.auth().currentUser.updateProfile({
  //     displayName: firstName + ' ' + lastName
  //   })
  //   firebase.auth().currentUser.sendEmailVerification()
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}

model.login = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
  } catch (err) {
    if (err.code == 'auth/user-not-found' || err.code == 'auth/invalid-email') {
      showError(email, 'Email is not registered');
    } else if (err.code == 'auth/wrong-password') {
      showError(password, 'Password is wrong');
    }
    // console.log(err);
  }
}

model.chat = async () => {
  try {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        if (user.emailVerified) {
          model.currentUser = {
            displayName: user.displayName,
            email: user.email
          }

          view.setActiveScreen('chatScreen');
        } else {
          view.setActiveScreen('loginScreen');
          alert('Please verify your email');
        }
      } else {
        view.setActiveScreen('loginScreen');
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}

model.addMessage = (message) => {
  const dataToUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(message)
  }
  firebase.firestore().collection(model.collectionName).doc('fAnPTlov2jqtwTATeISY').update(dataToUpdate);
}

model.loadConversations = async () => {
  console.log(model.currentUser);
  const response = await firebase
    .firestore()
    .collection(model.collectionName)
    .where('users', 'array-contains', model.currentUser.email)
    .get();
  model.conversations = getDataFromDocs(response.docs);
  if (model.conversations.length > 0) {
    model.currentConversation = model.conversations[0];
    view.showCurrentConversation();
  }
}

model.listenConversationsChange = () => {
  let isFirstRun = true;
  firebase
    .firestore()
    .collection(model.collectionName)
    .where('users', 'array-contains', model.currentUser.email)
    .onSnapshot((res) => {
      if (isFirstRun) {
        isFirstRun = false;
        return
      }
      const docChanges = res.docChanges();
      for (oneChange of docChanges) {
        const type = oneChange.type;
        if (type === 'modified') {
          const docData = getDataFromDoc(oneChange.doc);
          // Update conversations
          for (let index = 0; index < model.conversations.length; index++) {
            if (model.conversations[index].id === docData.id) {
              model.conversations[index] = docData
            }
          }
          // Update currentConversation
          if (docData.id === model.currentConversation.id) {
            model.currentConversation = docData;
            const lastMessage = docData.messages[docData.messages.length - 1];
            console.log(lastMessage);
            view.addMessage(lastMessage);
          }
        }
      }
    })
}