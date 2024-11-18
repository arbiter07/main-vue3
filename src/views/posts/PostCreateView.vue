<template>
  <div>
    <h2>게시글 생성</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      @submit.prevent="save"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>
            <span>저장</span>
          </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAleart, vSuccess } = useAlert();
const router = useRouter();

const form = ref({
  title: null,
  content: null,
});
const loading = ref(false);
const error = ref(null);

const save = async () => {
  try {
    loading.value = true;
    const data = {
      ...form.value,
      createdAt: Date.now(),
    };
    await createPost(data);
    router.push({ name: 'postList' });
    vSuccess('등록이 완료되었습니다');
  } catch (e) {
    vAleart(e.message);
    error.value.message = e;
  } finally {
    loading.value = false;
  }
};

const goListPage = () => {
  router.push({ name: 'postList' });
};
</script>

<style lang="scss" scoped></style>
