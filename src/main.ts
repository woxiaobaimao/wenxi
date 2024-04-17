import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'
import 'easymde/dist/easymde.min.css'
axios.defaults.baseURL = 'http://106.54.62.212:3000/'
axios.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(
  (config) => {
    setTimeout(() => {
      store.commit('setLoading', false)
    }, 1000)
    return config
  },
  (e) => {
    const { message } = e.response.data
    store.commit('setError', { status: true, message })
    store.commit('setLoading', false)
    return Promise.reject(e.response.data)
  }
)
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
