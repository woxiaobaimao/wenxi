<template>
  <div class="home-page mt-3">
    <div class="d-flex" style="gap: 20px">
      <PostList :list="list"></PostList>
      <div>
        <Author></Author>
        <div class="card mb-3 shadow-sm" style="width: 18rem">
          <div class="p-2">文章榜</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
            <li class="list-group-item">Vestibulum at eros</li>
            <li class="list-group-item">Vestibulum at eros</li>
            <li class="list-group-item">Vestibulum at eros</li>
            <li class="list-group-item">Vestibulum at eros</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <div class="btn">查看更多</div>
        </div>
      </div>
    </div>
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
import Author from '@/components/Author.vue'

const store = useStore<GlobalDataProps>()
const total = computed(() => store.state.topics.total)
const page = computed(() => store.state.topics.page)
onMounted(() => {
  store.dispatch('fetchPosts', '6620c9ed8708337110329559')
})
const list = computed(() => store.getters.getPosts)
console.log(list)

const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
  size: 3,
  page: page.value ? page.value + 1 : 2
})
</script>
