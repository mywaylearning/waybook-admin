import angular from 'angular';
const bulk = require('bulk-require');

const controllersModule = angular.module('app.controllers', []);

const controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(controllers).forEach((key) => {
  const item = controllers[key];
  controllersModule.controller(item.name, /* ngInject */ item.fn);
});

export default controllersModule;
