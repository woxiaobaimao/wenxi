<template>
  <div class="container-wrapper">
    <div style="height: 54px">
      <global-header :user="currentUser"></global-header>
    </div>
    <loader v-if="isLoading"></loader>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 文溪</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from './store'

const store = useStore<GlobalDataProps>()
const currentUser = computed(() => store.state.user)
const isLoading = computed(() => store.state.loading)
</script>

<style>
.container-wrapper {
  color: #6c757d;
  background-color: #f2f3f5;
}
.container {
}
</style>
