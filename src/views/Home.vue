<template>
  <div class="home-page mt-3">
    <PostList :list="list"></PostList>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
      @click="loadMorePage"
      v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import useLoadMore from '../hooks/useLoadMore'
import PostList from '../components/PostList.vue'

const store = useStore<GlobalDataProps>()
const total = computed(() => store.state.topics.total)
const page = computed(() => store.state.topics.page)
onMounted(() => {
  store.dispatch('fetchPosts', '661fd90d637b502f18b11bb1')
})
const list = computed(() => store.getters.getPosts)
console.log(list)

const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
  size: 3,
  page: page.value ? page.value + 1 : 2
})
</script>
