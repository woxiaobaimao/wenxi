<template>
  <div class="post-detail-page d-flex">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="container w-75 pb-3 card mt-3 shadow-sm" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl" />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link type="button" class="btn btn-success" :to="{ name: 'create', query: { id: currentPost._id } }">
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
    <div>
      <div class="card mb-3 shadow-sm">
        <div class="p-2">作者</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
          <li class="list-group-item">Vestibulum at eros</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="btn">查看更多</div>
      </div>
      <div class="card mb-3 shadow-sm">
        <div class="p-2">相关推荐</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
          <li class="list-group-item">Vestibulum at eros</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="btn">查看更多</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { marked } from 'marked'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../store'
import UserProfile from '../components/UserProfile.vue'
import Modal from '../components/Modal.vue'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'post-detail',
  components: {
    UserProfile,
    Modal
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        const { isHTML, content } = currentPost.value
        return isHTML ? content : marked.parse(content)
      } else {
        return ''
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps) + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
        setTimeout(() => {
          router.push({ name: 'column', params: { id: rawData.data.column } })
        }, 2000)
      })
    }
    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>
