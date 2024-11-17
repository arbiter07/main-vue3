<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select @change="changeSelectBox($event)" class="form-select">
            <option value="3">3개씩보기</option>
            <option value="6">6개씩보기</option>
            <option value="9">9개씩보기</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>

    <hr class="my-5" />
    <AppCard v-if="posts && posts.length > 0">
      <PostDetailView :id="posts[0].id"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);
const error = ref(null);
const loading = ref(false);
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const changeSelectBox = event => {
  params.value._limit = event.target.value;
  params.value._page = 1;
};

const fetchPosts = async () => {
  try {
    loading.value = true;
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (e) {
    console.error('error', e);
    error.value = e;
  } finally {
    loading.value = false;
  }
};

// watch와 다르게 초기에 한번 실행됨. params가 변경될때 callback
watchEffect(fetchPosts);

const goPage = id => {
  router.push({
    name: 'postDetail',
    params: {
      id: id,
    },
  });
};

//modal

const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const show = ref(false);
const openModal = ({ title, content, createdAt }) => {
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
  show.value = true;
};
</script>

<style lang="scss" scoped></style>
