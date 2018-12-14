function required(value, message) {
  return !!value || message || 'This field is required'
}

function lowerCaseLetters(value, message) {
  return (
    /^[a-z]+$/.test(value) || message || 'Only letters in lowercase are allowed'
  )
}

function numeric(value, message) {
  return /^[0-9]+$/.test(value) || message || 'Only numbers are allowed'
}

export { required, lowerCaseLetters, numeric }
