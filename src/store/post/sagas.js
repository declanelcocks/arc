import { take, put, call, fork } from 'redux-saga/effects'
import defaultApi from 'services/api'
import { postList, postCreate, POST_LIST_REQUEST, POST_CREATE_REQUEST } from './actions'

export function* createPost(newData, api) {
  try {
    const { data } = yield call(api.post, '/posts', newData)
    yield put(postCreate.success(data))
  } catch (e) {
    yield put(postCreate.failure(e))
  }
}

export function* listPosts(limit, api) {
  try {
    const params = { _limit: limit }
    const { data } = yield call(api.get, '/posts', { params })
    yield put(postList.success(data))
  } catch (e) {
    yield put(postList.failure(e))
  }
}

export function* watchPostCreateRequest(api) {
  while (true) {
    const { data } = yield take(POST_CREATE_REQUEST)
    yield call(createPost, data, api)
  }
}

export function* watchPostListRequest(api) {
  while (true) {
    const { limit } = yield take(POST_LIST_REQUEST)
    yield call(listPosts, limit, api)
  }
}

// istanbul ignore next
function* main(api = defaultApi) {
  yield fork(watchPostCreateRequest, api)
  yield fork(watchPostListRequest, api)
}

export default main
