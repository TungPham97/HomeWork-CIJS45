const view = {};

view.setActiveScreen = (screenName) => {

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
      model.loadConversations();
      model.listenConversationsChange();
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
  // Change title conversation
  document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title;
  // Print messages
  for (message of model.currentConversation.messages) {
    view.addMessage(message);
  }
}