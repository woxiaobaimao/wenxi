import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { arrToObj, objToArr } from './helper'
export interface ResponseType<P = Record<string, never>> {
  code: number
  msg: string
  data: P
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  name?: string
  avatar?: ImageProps
  description?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: string
  description: string
}
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}
interface ListProps<P> {
  [id: string]: P
}
export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  token: string
  error: GlobalErrorProps
  loading: boolean
  topics: { data: ListProps<ColumnProps>; page: number; total: number }
  posts: { data: ListProps<PostProps>; loadedColumns: string[] }
  user: UserProps
}
const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'get' },
  extraData?: any
) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    topics: { data: {}, page: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false }
  },
  mutations: {
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: 'viking' }
    // },
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns(state, rawData) {
      state.topics = {
        data: rawData,
        total: 999,
        page: 1
      }
    },
    fetchColumn(state, rawData) {
      state.topics.data[rawData._id] = rawData
    },
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPostsAndReplace(state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...arrToObj(rawData) }
      state.posts.loadedColumns = [columnId]
    },
    fetchPost(state, rawData) {
      state.posts.data[rawData._id] = rawData
    },
    deletePost(state, { data }) {
      delete state.posts.data[data._id]
    },
    updatePost(state, { data }) {
      state.posts.data[data._id] = data
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData }
    },
    login(state, rawData) {
      const { token } = rawData
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns({ state, commit }, params = {}) {
      const { page = 1, size = 6 } = params
      if (state.topics.page < page) {
        return asyncAndCommit(`/topics?page=${page}&size=${size}`, 'fetchColumns', commit)
      }
    },
    fetchColumn({ state, commit }, cid) {
      if (!state.topics.data[cid]) {
        return asyncAndCommit(`/topics/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/topics/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    fetchPostsAndReplace({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/topics/${cid}/posts`, 'fetchPostsAndReplace', commit, { method: 'get' }, cid)
      }
    },
    fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    fetchCurrentUser({ commit }) {
      return asyncAndCommit('/users/info', 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return asyncAndCommit('/users/login', 'login', commit, { method: 'post', data: payload })
    },
    createPost({ commit }, payload) {
      return asyncAndCommit('/posts', 'createPost', commit, { method: 'post', data: payload })
    },
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.topics.data)
    },
    getPosts: (state) => {
      return objToArr(state.posts.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.topics.data[id]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter((post) => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  }
})

export default store
