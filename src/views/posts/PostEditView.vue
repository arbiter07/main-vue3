<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>
            <span>수정</span>
          </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { getPostById, udpatePost } from '@/api/posts';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAleart, vSuccess } = useAlert();

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const form = ref({
  title: null,
  content: null,
  createdAt: null,
});
const error = ref(null);
const loading = ref(false);

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostById(id);
    setForm(data);
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};
const setForm = ({ title, content, createdAt }) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
};
fetchPost();

const editError = ref(null);
const editLoading = ref(false);

const edit = async () => {
  try {
    editLoading.value = true;
    await udpatePost(id, { ...form.value });
    vSuccess('수정이 완료되었습니다.');
    router.push({ name: 'postDetail', params: { id } });
  } catch (e) {
    vAleart(e.message);
    editError.value = e;
  } finally {
    editLoading.value = false;
  }
};

const goDetailPage = () => {
  router.push({
    name: 'postDetail',
    params: { id: id },
  });
};

watch(form.value, newValue => {
  console.log(newValue);
});
</script>

<style lang="scss" scoped></style>
