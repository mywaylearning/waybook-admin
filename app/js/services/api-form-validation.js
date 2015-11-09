function ApiFormValidationService() {
  'ngInject';

  const service = {};

  service.applyErrors = function(form, reason) {
    const data = reason.data;

    if (!form.$api) {
      service.reset(form);
    }

    // no data returned, fallback to system error
    if (!data) {
      form.$api.$error.systemError = true;
      service.setInvalid(form);
      return;
    } else {
      // this is general error not connected to any field
      if (data.code) {
        form.$api.$error[data.code] = true;
        service.setInvalid(form);
      }

      angular.forEach(data.fieldErrors, service.applyError.bind(null, form));
    }
  };

  service.applyError = function(form, error) {
    const code = error.code;
    const field = error.field;
    let api;

    if (!form.$api) {
      service.reset(form);
    }

    api = form.$api;

    // field does is not able to handle API errors
    if (!form[field] || !form[field].$registerApiError) {
      if (!api.$error[code]) {
        api.$error[code] = [];
      }

      api.$error[code].push(field);
      service.setInvalid(form);
    } else { // field exists and is able to handle API errors
      form[field].$registerApiError(code);
    }
  };

  service.reset = function(form) {
    form.$api = {
      $error: {},
      $invalid: false,
      $valid: true
    };
  };


  service.setInvalid = function(form) {
    if (!form.$api) {
      service.reset(form);
    }

    form.$api.$invalid = true;
    form.$api.$valid = false;
  };


  service.setValid = function(form) {
    if (!form.$api) {
      service.reset(form);
    }

    form.$api.$invalid = false;
    form.$api.$valid = true;
  };


  return service;
}

export default {
  name: 'ApiFormValidationService',
  fn: ApiFormValidationService
};
