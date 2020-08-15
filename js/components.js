const components = {};

components.welcomeScreen = `
  <h1>Hello</h1>
`;

components.registerScreen = `
<div class="login-container">
  <div class="aside-right">
    <div class="header">
      <h2>My chat</h3>
    </div>
    <form id='register-form'>
      <div class="input-name-wrapper">
        <div class="input-wrapper">
          <input type="text" name="firstName" placeholder="First Name" />
          <div class="error" id='first-name-error'></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="lastName" placeholder="Last Name" />
          <div class="error" id='last-name-error'></div>
        </div>
      </div>
      <div class="input-wrapper">
        <input type='text' placeholder="Email" name='email' />
        <div class="error" id='email-error'></div>
      </div>
      <div class="input-wrapper">
        <input type='password' placeholder="Password" name='password' />
        <div class="error" id='password-error'></div>
      </div>
      <div class="input-wrapper">
        <input type='password' placeholder="Confirm password" name='confirmPassword' />
        <div class="error" id='confirm-password-error'></div>
      </div>
      <div class="form-action">
        <span id='redirect-to-login'>
          Already have an account? Login
        </span>
        <button type="submit" class="btn">
          Register
        </button>
      </div>
    </form>
  </div>
</div>

`;

components.loginScreen = `
<div class="login-container">
  <div class="aside-right">
    <div class="header">
      <h2>My chat</h3>
    </div>
    <form id='login-form'>
      <div class="input-wrapper">
        <input type='text' placeholder="Email" name='email' />
        <div class="error" id='email-error'></div>
      </div>
      <div class="input-wrapper">
        <input type='password' placeholder="Password" name='password' />
        <div class="error" id='password-error'></div>
      </div>
      <div class="form-action">
        <span id='redirect-to-register'>
          Don't have an account? Register
        </span>
        <button type="submit" class="btn">
          Login
        </button>
      </div>
    </form>
  </div>
</div>

`;

components.chatScreen = `
<div class="chat-container">
  <div class="header">
    My Chat
  </div>
  <div class="main">
    <div class="aside-left">
      <div class="create-conversation">
        <button class='btn'>
          + New conversation
        </button>
      </div>
      <div class="list-conversation">
      </div>
    </div>

    <div class="conversation-detail">
      <div class="conversation-header">
        First conversation
      </div>
      <div id='out' class="list-messages">
      </div>
      <form id='send-message-form'>
        <div class="input-wrapper">
          <input type="text" name='message' placeholder="Type a message" />
        </div>
        <button type="submit">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </form>
    </div>
    <div class="aside-right">
    <div class="list-user">
    
    </div>
      <form id="add-user-form">
        <div class="input-wrapper">
          <input type="text" placeholder="Input friend email" name="email">
          <div class="error" id="add-user-email-error"></div>
        </div>
        <button class="btn" type="submit">Add</button>
      </form>
    </div>
  </div>
</div>
`;

components.createConversation = `
<div class="create-conversation-container">
<div class="header">
  My chat
</div>
<div class="main" style='padding: 50px 20%'>
  <form id="create-conversation-form">
    <h2 style="margin-bottom: 20px">
      Create a new conversation
    </h2>
    <div class="input-wrapper">
      <input type='text' placeholder="Conversation name" name='conversationTitle'>
      <div class="error" id='conversation-name-error'></div>
    </div>
    <div class="input-wrapper">
      <input type='text' placeholder="Friend email" name='conversationEmail'>
      <div class="error" id='conversation-email-error'></div>
    </div>
    <button class="btn" type='submit'>Save</button>
    <button class="btn btn-light" id='back-to-chat' type="button">Cancel</button>
  </form>
</div>
</div>

`;
