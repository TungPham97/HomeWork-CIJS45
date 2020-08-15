const controller = {};

// Show error message
function showError(input, message) {
  view.setErrorMessage(input, message);
}

// Show success
function showSuccess(input) {
  const error = input.nextElementSibling;
  error.innerText = '';
  input.className = 'success';
}

// Get field name input
function getFieldName(input) {
  return input.placeholder;
}

// Check required fields
function checkRequired(inputs) {
  let flag = 0;
  inputs.forEach(function (input) {
    if (input.value === '' || input.value.split(' ').length > 1) {
      showError(input, `${getFieldName(input)} is required or shouldn't contain blank space`);
      flag++;
    } else {
      showSuccess(input);
    }
  })
  return flag;
}

// Check length field
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`)
    return false;
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

// Check password match
function checkPasswordsMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Password do not match');
    return false;
  } else return true;
}

// Handle register
controller.register = (firstName, lastName, email, password, confirmPassword) => {
  const inputs = [firstName, lastName, email, password, confirmPassword];

  checkRequired(inputs);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);

  // if (
  //   lastName.value !== '' &&
  //   email.value !== '' &&
  //   password.value !== '' &&
  //   confirmPassword.value !== '' &&
  //   password.value === confirmPassword.value) {
  //   model.register(email.value, password.value, firstName.value, lastName.value);
  // }

  if (
    !checkRequired(inputs) &&
    checkLength(password, 6, 25) &&
    checkEmail(email) &&
    checkPasswordsMatch(password, confirmPassword)
  ) {
    model.register(email.value, password.value, firstName.value, lastName.value);
  }
}

// Handle login
controller.login = (inputs) => {
  checkRequired(inputs);
  let [email, password] = inputs;

  if (!checkRequired(inputs)) {
    model.login(email, password);
  }
}

controller.createConversation = ({ conversationTitle, conversationEmail }) => {
  if (conversationTitle.value.trim() === '') {
    showError(conversationTitle, 'Please input conversation name')
  } else {
    showSuccess(conversationTitle);
  }
  checkEmail(conversationEmail);

  // Push firebase
  if (conversationTitle.value.trim() !== '' && checkEmail(conversationEmail)) {
    const data = {
      title: conversationTitle.value,
      user: [conversationEmail.value, model.currentUser.email],
      createdAt: (new Date()).toISOString(),
      messages: [],
    }
    model.createConversation(data);
  }
}