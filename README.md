# cherrytree-for-react

Use the [cherrytree](https://github.com/QubitProducts/cherrytree) router in your React applications. This project provides a React component that you should put at the root of your render tree. The component handles hot reloading.

## Usage

    $ npm install --save cherrytree cherrytree-for-react

```js
import React from 'react'

import createCherrytree from 'cherrytree'
import { Router, Link } from 'cherrytree-for-react'
import * as components from './components'

import { Provider } from 'redux/react'
import { createDispatcher, createRedux, composeStores } from 'redux'
import * as stores from './stores'

const {
  Application,
  About,
  GithubStargazers,
  GithubRepo,
  GithubUser
} = components

const redux = createRedux(createDispatcher(composeStores(stores)))

const cherrytree = createCherrytree()
  .map(routes)
  .use(function redirect (transition) {
    transition.routes.map(route => {
      if (route.options.redirect)
        cherrytree.replaceWith.apply(cherrytree, route.options.redirect)
    })
  })
  .use(function error (transition) {
    transition.catch(err => console.error(err.stack))
  })

export default class App extends React.Component {
  render () {
    return (
      <Provider redux={redux}>
        {() => <Router router={cherrytree} />}
      </Provider>
    )
  }
}

function routes (route) {
  route('app', { path: '/', component: Application }, () => {
    route('about', { path: 'about', component: About })
    route('stargazers', { path: 'stargazers', component: GithubStargazers }, () => {
      route('repo', { path: ':username/:repo', component: GithubRepo })
      route('user', { path: ':username', component: GithubUser })
    })
    route('index', { path: '', redirect: [ 'user', { username: 'KidkArolis' }] })
  })
}
```

Note: this example demonstrates how you'd use `cherrytree-for-react` with `redux`. If you don't use `redux`, simply use `Router` component at the top level, instead of the `Provider`.

The router will be injected into the context of the render tree. You can use it to generate links or initiate transitions, e.g.

```js
let transition = this.context.router.transitionTo('repo', {username: 'facebook', repo: 'react'})
let url = this.context.router.generate('repo', {username: 'facebook', repo: 'react'})
```

Browse [cherrytree](https://github.com/QubitProducts/cherrytree) repo for more docs and examples.

## Generating Links

`<Link>` components are used to create an `<a>` element that links to a route.

Import first

```js
import { Link } from 'cherrytree-for-react'
```

For example, assuming you have the following route:

```js
route('showPost', {path: '/posts/:postID', component: Post})
```

You could use the following component to link to that route:

```js
<Link to='showPost' params={{ postId: post.id }} query={{ show: true }} />
```

To create a link with full (external or local) url, use the `href` attribute instead

```js
<Link href={`/posts/${post.id}`} />
```

## Server Side Usage

This component can also be used in the server side, in that case, an already started cherrytree
instance needs to be passed in, e.g.

```js
// start listening
cherrytree.listen(new cherrytree.MemoryLocation('/foo/bar')).then(function () {
  React.renderToString(<Router router={cherrytree} />)
})
```

In this case, the `<Router>` component will detect that the router has already been started and will
not call the asynchronous listen function.

For a full, working server side example, see the [cherrytree/examples/server-side-example](https://github.com/QubitProducts/cherrytree/tree/master/examples/server-side-react).

## Examples

There are currently two examples:

* a purely server side express app using `cherrytree-for-react` can be found over at [cherrytree/examples/server-side-react](https://github.com/QubitProducts/cherrytree/tree/master/examples/server-side-react)
* a client side redux + react + cherrytree + hot reloading example over at [KidkArolis/cherrytree-redux-react-example](https://github.com/KidkArolis/cherrytree-redux-react-example)
