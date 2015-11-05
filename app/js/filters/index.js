import angular from 'angular';
const bulk = require('bulk-require');

const filtersModule = angular.module('app.filters', []);

const filters = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(filters).forEach((key) => {
  const item = filters[key];

  filtersModule.filter(item.name, item.fn);
});

export default filtersModule;
