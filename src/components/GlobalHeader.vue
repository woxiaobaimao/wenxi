<template>
  <nav
    class="navbar navbar-light fixed-top justify-content-between mb-4"
    style="background-color: white; padding: 0 300px"
  >
    <div class="d-flex align-items-end">
      <div style="cursor: pointer" class="navbar-brand" @click="gotoPage('6620c9ed8708337110329559')">文溪</div>
      <div style="cursor: pointer" class="navbar-brand fs-6" @click="gotoPage('66223c3e8708337110329571')">前端</div>
      <div style="cursor: pointer" class="navbar-brand fs-6" @click="gotoPage('66223c438708337110329573')">后端</div>
    </div>
    <div class="d-flex align-items-center">
      <div class="input-group input-group-sm" style="height: 40px">
        <input
          type="text"
          class="form-control"
          placeholder="搜索..."
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <button class="btn btn-sm btn-outline-secondary" type="button" @click="queryPost">搜索</button>
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
    </div>
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
// 搜索文章
const queryPost = () => {
  console.log(11)
}
const gotoPage = (column: string) => {
  router.push('/' + column)
  store.dispatch('fetchPostsAndReplace', column)
}
</script>
