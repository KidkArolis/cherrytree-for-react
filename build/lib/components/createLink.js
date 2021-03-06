'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createLink;

var _react = require('react');

var object = _react.PropTypes.object;
var string = _react.PropTypes.string;
var func = _react.PropTypes.func;

/**
 * <Link> components are used to create an <a> element that links to a route.
 *
 * For example, assuming you have the following route:
 *
 *   route('showPost', {path: '/posts/:postID', component: Post})
 *
 * You could use the following component to link to that route:
 *
 *   <Link to='showPost' params={{ postId: post.id }} query={{ show: true }} />
 */

function createLink() {
  var Link = (0, _react.createClass)({

    contextTypes: {
      router: object
    },

    propTypes: {
      to: string,
      href: string,
      query: object,
      params: object,
      onClick: func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        className: '',
        style: {}
      };
    },

    render: function render() {
      var router = this.context.router;

      var props = _extends({}, this.props);

      // Ignore if rendered outside of the context of a
      // router, simplifies unit testing.
      if (router) {
        var _props = this.props;
        var to = _props.to;
        var params = _props.params;
        var query = _props.query;
        var href = _props.href;

        if (href) {
          props.href = router.location.formatURL(href);
        } else {
          props.href = router.generate(to, params, query);
        }
      }

      return (0, _react.createElement)('a', props);
    }

  });

  return Link;
}

module.exports = exports['default'];