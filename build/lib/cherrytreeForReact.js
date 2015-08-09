'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsCreateRouter = require('./components/createRouter');

var _componentsCreateRouter2 = _interopRequireDefault(_componentsCreateRouter);

var _componentsCreateLink = require('./components/createLink');

var _componentsCreateLink2 = _interopRequireDefault(_componentsCreateLink);

var Router = (0, _componentsCreateRouter2['default'])();
exports.Router = Router;
var Link = (0, _componentsCreateLink2['default'])();
exports.Link = Link;