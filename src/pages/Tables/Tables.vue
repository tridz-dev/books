<template>
  <div class="flex flex-col h-screen">
    <PageHeader :title="content" />
    <div class="flex w-full h-full items-center justify-center">
      {{ content }}
    </div>
  </div>
</template>
<script lang="ts">
import PageHeader from 'src/components/PageHeader.vue';
import { defineComponent } from 'vue';

const content = 'Tables Page';

export default defineComponent({
  name: 'Tables',
  components: {
    PageHeader,
  },
  emits: ['close'],
  data() {
    return {
      content: content,
    } as {
      content: string;
    };
  },
});
</script>
