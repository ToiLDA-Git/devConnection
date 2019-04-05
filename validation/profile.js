const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!validator.isLength(data.handle, {min: 2, max: 40})) {
    errors.handle = 'Handle needs to between 2 and 40'
  }

  if(validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required'
  }

  if(validator.isEmpty(data.status)) {
    errors.status = 'Status is required'
  }

  if(validator.isEmpty(data.handle)) {
    errors.skills = 'Skills is required'
  }

  if (!isEmpty(data.website)) {
    if(!validator.isURL(data.website)) {
      errors.website = 'not a valid URL';
    }
  }

  if (!isEmpty(data.youtube)) {
    if(!validator.isURL(data.youtube)) {
      errors.website = 'not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if(!validator.isURL(data.twitter)) {
      errors.website = 'not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if(!validator.isURL(data.facebook)) {
      errors.website = 'not a valid URL';
    }
  }

  if (!isEmpty(data.linkedIn)) {
    if(!validator.isURL(data.linkedIn)) {
      errors.website = 'not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if(!validator.isURL(data.instagram)) {
      errors.website = 'not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}