function apiValidate() {
  const errors = [];
  let model;

  function apiValidator() {
    // validation loop, remove all field api errors
    while (errors.length) {
      model.$setValidity(errors.shift(), true);
    }

    // this is fake validator, just return true
    return true;
  }

  function registerApiError(code) {
    errors.push(code);

    model.$setValidity(code, false);
  }

  function postLink(scope, element, attrs, ngModel) {
    model = ngModel;

    // expose interface to register API error for this field
    model.$registerApiError = registerApiError;

    // add validator to validation loop, that will remove current API errors
    model.$validators.apiValidate = apiValidator;
  }

  return {
    require: 'ngModel',
    restrict: 'A',
    link: postLink
  };
}

export default {
  name: 'apiValidate',
  fn: apiValidate
};
