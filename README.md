# cherrytree-for-react

Use the [cherrytree](https://github.com/QubitProducts/cherrytree) router in your React applications. This project provides a React component that you should put at the root of your render tree. The component handles hot reloading.

## Usage

    $ npm install --save cherrytree cherrytree-for-react

```js
import React from 'react'

import createCherrytree from 'cherrytree'
import { Router } from 'cherrytree-for-react'
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

## WIP

This repo was just created and is a work in progress. The code is in es6 atm and so you'll need to have a compilation pipeline if you want to use this lib. I just haven't spent the time of setting up the prenpm compilation for this one. Do you have a good boilerplate?

A full working redux + react + cherrytree + hot reloading example is also coming soon.
