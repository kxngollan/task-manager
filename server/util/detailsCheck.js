const hasLowercase = (str) => {
  return /[a-z]/.test(str);
};

const hasUppercase = (str) => {
  return /[A-Z]/.test(str);
};

const hasSpecialCase = (str) => {
  return /[!@#$%^&*()_+=[\]{};':"\\|,.<>?/]/.test(str);
};

const hasNumber = (str) => {
  return /[0-9]/.test(str);
};

const passwordCheck = (password) => {
  if (
    password.length >= 8 &&
    hasLowercase(password) &&
    hasUppercase(password) &&
    hasSpecialCase(password) &&
    hasNumber(password)
  ) {
    return true;
  }
  return false;
};

const emailCheck = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = { passwordCheck, emailCheck };
