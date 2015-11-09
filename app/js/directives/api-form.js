function apiForm(ApiFormValidationService) {
  'ngInject';

  function formSubmitted(form, promise) {
    if (!promise || !promise.then) {
      return;
    }

    ApiFormValidationService.reset(form);

    promise.then(
      null,
      function failure(reason) {
        ApiFormValidationService.applyErrors(form, reason);
      }
    );
  }

  function postLink(scope, element, attrs, formCtrl) {
    const watchPromise = attrs.apiForm || null;

    if (watchPromise !== void 0) {
      scope.$watch(watchPromise, formSubmitted.bind(null, formCtrl));
    }
  }

  return {
    require: 'form',
    restrict: 'A',
    link: postLink
  };
}

export default {
  name: 'apiForm',
  fn: apiForm
};
