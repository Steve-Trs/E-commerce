function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
}

function validatePassword(string) {
  var re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&§#])[A-Za-z\d@$!%*?&§#]{3,}$/;
  return re.test(String(string));
}

module.exports = { validateEmail, validatePassword };
