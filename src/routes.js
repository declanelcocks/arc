import App from 'components/App'

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/HomePage').default)
        })
      },
    },
    {
      path: '/sample-page',
      name: 'samplepage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/SamplePage').default)
        })
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/NotFoundPage').default)
        })
      },
    },
  ],
}

export default routes
