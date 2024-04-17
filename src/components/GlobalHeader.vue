<template>
  <nav
    class="navbar navbar-light fixed-top justify-content-between mb-4"
    style="background-color: white; padding: 0 300px"
  >
    <div>
      <router-link class="navbar-brand" to="/">文溪</router-link>
      <router-link class="navbar-brand fs-6 text-primary" to="/">综合</router-link>
      <router-link class="navbar-brand fs-6" to="/">前端</router-link>
      <router-link class="navbar-brand fs-6" to="/">后端</router-link>
    </div>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item" v-if="!isLoginPage">
        <router-link to="/login" class="btn my-2">登录</router-link>
      </li>
      <li class="list-inline-item" v-else>
        <router-link to="/signup" class="btn my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item
            ><router-link :to="{ path: '/create', query: { column: route.params.id } }" class="dropdown-item"
              >新建文章</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item
          >
          <dropdown-item><a href="#" @click="edit" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" @click="logout" class="dropdown-item">退出登录</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import store, { UserProps } from '../store'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoginPage = computed(() => route.name === 'login')
defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true
  }
})

// 退出登录
const logout = () => {
  store.commit('logout')
  router.push('login')
}
// 编辑资料
const edit = () => {
  router.push('personalinformation')
}
</script>
