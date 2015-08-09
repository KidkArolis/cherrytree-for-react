import React, { createElement, PropTypes } from 'react'

export default function createRouter () {
  return React.createClass({
    propTypes: {
      router: PropTypes.object.isRequired
    },

    childContextTypes: {
      router: PropTypes.object
    },

    getChildContext () {
      return {
        router: this.state.router
      }
    },

    getInitialState: function () {
      return {
        router: this.props.router,
        routes: this.props.router.state.routes || [],
        params: this.props.router.state.routes || {},
        search: this.props.router.state.search || {},
        // hacky?
        routerAlreadyStarted: !!this.props.router.state.routes
      }
    },

    installRenderMiddleware: function (router) {
      let render = transition => this.setState({
        routes: transition.routes,
        params: transition.params
      })
      router.use(render)
    },

    componentWillReceiveProps: function (nextProps) {
      let currentRouter = this.state.router
      let nextRouter = nextProps.router
      if (nextRouter !== currentRouter) {
        currentRouter.destroy()
        this.installRenderMiddleware(nextRouter)
        nextRouter.listen()
        this.setState({
          router: nextRouter
        })
      }
    },

    componentWillMount: function () {
      if (!this.state.routerAlreadyStarted) {
        let router = this.state.router
        this.installRenderMiddleware(router)
        router.listen()
      }
    },

    render: function () {
      let { routes, params, search } = this.state
      return routes.reduceRight((element, route) => {
        if (!route.options.component) {
          return element
        } else {
          return createElement(route.options.component, {
            params: params,
            search: search,
            children: element
          })
        }
      }, null)
    }
  })
}
