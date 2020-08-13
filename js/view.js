const view = {};

view.setActiveScreen = (screenName, fromCreateConversation = false) => {

  switch (screenName) {
    // Welcome screen 
    case 'welcomeScreen':
      document.getElementById('app').innerHTML = components.welcomeScreen;
      break;

    // Register Screen
    case 'registerScreen':
      document.getElementById('app').innerHTML = components.registerScreen;
      const redirectToLogin = document.getElementById('redirect-to-login');

      // Redirect to login
      redirectToLogin.addEventListener('click', (e) => {
        view.setActiveScreen('loginScreen');
      })

      var registerForm = document.getElementById('register-form');

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = registerForm.firstName;
        const lastName = registerForm.lastName;
        const email = registerForm.email;
        const password = registerForm.password;
        const confirmPassword = registerForm.confirmPassword;

        controller.register(firstName, lastName, email, password, confirmPassword);
      })
      break;

    // Login Screen
    case 'loginScreen':
      document.getElementById('app').innerHTML = components.loginScreen;
      const redirectToRegister = document.getElementById('redirect-to-register');

      var registerForm = document.getElementById('login-form');

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = registerForm.email;
        const password = registerForm.password;
        const inputs = [email, password];

        controller.login(inputs);
      })

      // Redirect to register
      redirectToRegister.addEventListener('click', (e) => {
        view.setActiveScreen('registerScreen');
      })
      break;

    // Chat Screen
    case 'chatScreen':
      document.getElementById('app').innerHTML = components.chatScreen;

      document.querySelector('.create-conversation .btn').addEventListener('click', () => {
        view.setActiveScreen('createConversation')
      })

      const sendMessageForm = document.getElementById('send-message-form');
      sendMessageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = {
          content: sendMessageForm.message.value,
          owner: model.currentUser.email,
          createdAt: (new Date()).toISOString()
        }
        const reg = /\S/g;
        if (message.content == '' || !reg.test(message.content)) {
          sendMessageForm.message.value = '';
        } else {
          model.addMessage(message);
        }
        sendMessageForm.message.value = '';
      })
      if (!fromCreateConversation) {
        model.loadConversations();
        model.listenConversationsChange();
      } else {
        view.showConversations();
        view.showCurrentConversation();
      }
      break;

    // Create conversation
    case 'createConversation':
      document.getElementById('app').innerHTML = components.createConversation;
      document.querySelector('#back-to-chat').addEventListener('click', () => {
        view.setActiveScreen('chatScreen', true);
      })
      document.querySelector('#create-conversation-form').addEventListener('submit', (event) => {
        event.preventDefault();
        let nameConversation = event.target.conversationTitle.value;
        let emailFriend = event.target.conversationEmail.value;
        const conversationToAdd = {
          title: nameConversation,
          message: '',
          users: [emailFriend],
        };

        controller.createConversation(event.target.conversationTitle, event.target.conversationEmail);
      })
      break;
  }
}

view.addMessage = (message) => {
  let messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-container');
  if (message.owner === model.currentUser.email) {
    messageWrapper.classList.add('mine')
    messageWrapper.innerHTML = `
      <div class='content'>
        ${message.content}
      </div>
    `
  } else {
    messageWrapper.classList.add('other');
    messageWrapper.innerHTML = `
      <div class="owner">
        ${message.owner}
      </div>
      <div class="content">
        ${message.content}
      </div>
    `
  }
  document.querySelector('.list-messages').appendChild(messageWrapper);
  const out = document.getElementById('out');

  let isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop;
  if (!isScrolledToBottom)
    out.scrollTop = out.scrollHeight - out.clientHeight;
}

view.showCurrentConversation = () => {
  document.querySelector('.list-messages').innerHTML = '';
  // Change title conversation
  document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title;
  // Print messages
  for (message of model.currentConversation.messages) {
    view.addMessage(message);
  }
}

view.showConversations = () => {
  for (oneConversation of model.conversations) {
    view.addConversation(oneConversation);
  }
}

view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement('div');
  conversationWrapper.className = 'conversation cursor-pointer';
  if (model.currentConversation.id == conversation.id) {
    conversationWrapper.classList.add('current');
  }
  conversationWrapper.innerHTML = `
    <div class='conversation-title'>${conversation.title}</div>
    <div class='conversation-num-user'>${conversation.users.length} users</div>
  `;
  conversationWrapper.addEventListener('click', () => {
    // Thay doi giao dien, doi current
    document.querySelector('.current').classList.remove('current');
    conversationWrapper.classList.add('current');

    // Thay doi model.currentConversation
    model.currentConversation = conversation;

    // In cac tin nhan cua model.currentConversation
    view.showCurrentConversation();
  })
  document.querySelector('.list-conversation').appendChild(conversationWrapper);

}