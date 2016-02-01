'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRouter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function createRouter() {
  return _react2['default'].createClass({
    propTypes: {
      router: _react.PropTypes.object.isRequired
    },

    childContextTypes: {
      router: _react.PropTypes.object
    },

    getChildContext: function getChildContext() {
      return {
        router: this.state.router
      };
    },

    getInitialState: function getInitialState() {
      return {
        router: this.props.router,
        routes: this.props.router.state.routes || [],
        params: this.props.router.state.routes || {},
        query: this.props.router.state.query || {},
        // hacky?
        routerAlreadyStarted: !!this.props.router.state.routes
      };
    },

    installRenderMiddleware: function installRenderMiddleware(router) {
      var _this = this;

      var render = function render(transition) {
        return transition.then(function () {
          return _this.setState({
            routes: transition.routes,
            params: transition.params
          });
        });
      };
      router.use(render);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var currentRouter = this.state.router;
      var nextRouter = nextProps.router;
      if (nextRouter !== currentRouter) {
        currentRouter.destroy();
        this.installRenderMiddleware(nextRouter);
        nextRouter.listen();
        this.setState({
          router: nextRouter
        });
      }
    },

    componentWillMount: function componentWillMount() {
      if (!this.state.routerAlreadyStarted) {
        var router = this.state.router;
        this.installRenderMiddleware(router);
        router.listen();
      }
    },

    render: function render() {
      var _state = this.state;
      var routes = _state.routes;
      var params = _state.params;
      var query = _state.query;

      return routes.reduceRight(function (element, route) {
        if (!route.options.component) {
          return element;
        } else {
          return (0, _react.createElement)(route.options.component, {
            params: params,
            query: query,
            children: element
          });
        }
      }, null);
    }
  });
}

module.exports = exports['default'];