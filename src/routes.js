import App from 'components/App'

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('components/pages/HomePage').default)
        })
      },
    },
    {
      path: '/sample-page',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/SamplePage').default)
        })
      },
    },
    {
      path: '*',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/NotFoundPage').default)
        })
      },
    },
  ],
}

export default routes
