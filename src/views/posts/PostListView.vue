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
      <AppGrid v-if="posts" :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
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
    <AppCard v-if="previewId">
      <PostDetailView :id="previewId"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});

const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params });

// pagination
const totalCount = computed(
  () => response.value?.headers['x-total-count'] || 0,
);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const selectPreview = id => {
  previewId.value = id;
};
const previewId = ref(null);

const changeSelectBox = event => {
  params.value._limit = event.target.value;
  params.value._page = 1;
};
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
