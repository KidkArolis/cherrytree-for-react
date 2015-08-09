import { createClass, createElement, PropTypes } from 'react'

let { object, string, func } = PropTypes

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

export default function createLink () {
  let Link = createClass({

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

    getDefaultProps () {
      return {
        className: '',
        style: {}
      }
    },

    render () {
      let { router } = this.context

      let props = Object.assign({}, this.props)

      // Ignore if rendered outside of the context of a
      // router, simplifies unit testing.
      if (router) {
        let { to, params, query, href } = this.props

        if (href) {
          props.href = router.location.formatUrl(href)
        } else {
          props.href = router.generate(to, params, query)
        }
      }

      return createElement('a', props)
    }

  })

  return Link
}
