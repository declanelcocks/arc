import { expectSaga } from 'redux-saga-test-plan'
import * as actions from './actions'
import saga from './sagas'

describe('createPost', () => {
  it('calls success', () => {
    const post = (url, data) => Promise.resolve({ data: { id: 1, ...data } })
    return expectSaga(saga, { post })
      .call(post, '/posts', { title: 'test' })
      .put(actions.postCreate.success({ id: 1, title: 'test' }))
      .dispatch(actions.postCreate.request({ title: 'test' }))
      .run({ timeout: 0, silenceTimeout: true })
  })

  it('calls failure', () => {
    const post = () => Promise.reject('foo')
    return expectSaga(saga, { post })
      .call(post, '/posts', { title: 'test' })
      .put(actions.postCreate.failure('foo'))
      .dispatch(actions.postCreate.request({ title: 'test' }))
      .run({ timeout: 0, silenceTimeout: true })
  })
})

describe('listPosts', () => {
  it('calls success', () => {
    const get = () => Promise.resolve({ data: [1, 2, 3] })
    return expectSaga(saga, { get })
      .call(get, '/posts', { params: { _limit: 1 } })
      .put(actions.postList.success([1, 2, 3]))
      .dispatch(actions.postList.request(1))
      .run({ timeout: 0, silenceTimeout: true })
  })

  it('calls failure', () => {
    const get = () => Promise.reject('foo')
    return expectSaga(saga, { get })
      .call(get, '/posts', { params: { _limit: 1 } })
      .put(actions.postList.failure('foo'))
      .dispatch(actions.postList.request(1))
      .run({ timeout: 0, silenceTimeout: true })
  })
})
