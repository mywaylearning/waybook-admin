function ExampleDirective() {
  return {
    restrict: 'EA',
    templateUrl: 'directives/example.html',
    scope: {
      title: '@',
      message: '@exampleDirective'
    }
  };
}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};
