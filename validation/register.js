const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if(!validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if(validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  if(validator.isEmpty(data.name)) {
    errors.email = 'Email field is required'
  }

  if(!validator.isEmail(data.email)) {
    errors.email = 'Email not correct format'
  }

  if(!validator.isLength(data.password, { min: 6, max: 30})) {
    errors.password = 'Password must be at least 6 characters'
  }

  if(validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required'
  }

  if(!validator.equals(data.password, data.confirmPassword)) {
    errors.password = 'Confirm password not match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}