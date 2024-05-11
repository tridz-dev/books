<template>
  <div
    class="flex-1 flex justify-center items-center bg-gray-25"
    :class="{
      'window-drag': platform !== 'Windows',
    }"
  >
    <div class="w-dialog shadow-lg rounded-lg border relative bg-white">
      <div class="relative px-4 py-4">
        <button
          class="
            absolute
            right-5
            ms-auto
            p-2
            hover:bg-red-200
            rounded-full
            w-8
            h-8
            text-gray-600
            hover:text-red-400
          "
          @click="$emit('change-db-file')"
        >
          <feather-icon name="x" class="w-4 h-4" />
        </button>
        <h1 class="text-2xl text-center font-semibold select-none">
          {{ t`Login to the App` }}
        </h1>
      </div>
      <hr />
      <div class="flex flex-col items-center">
        <div class="text-gray-600 text-sm m-4 p-2 mb-1">Enter the passcode</div>
        <div class="relative w-3/4">
          <input
            :type="showPasscode ? 'text' : 'password'"
            v-model="inputValue"
            class="
              text-base
              border border-gray-200
              focus:outline-none
              w-full
              p-2
              rounded
              placeholder-gray-500
            "
          />
          <button
            @click="toggleShowPasscode"
            class="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            <Icon
              class="flex-shrink-0"
              :name="showPasscode ? 'eye-hide' : 'eye-show'"
              size="8"
              :height="3"
            />
          </button>
        </div>
        <Button class="mx-auto my-5" @click="Authenticate()"> Login </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { t } from 'fyo';
import Button from 'src/components/Button.vue';
import Icon from 'src/components/Icon.vue';
import { fyo } from 'src/initFyo';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLock',
  components: {
    Button,
    Icon,
  },
  emits: ['authenticate', 'change-db-file'],
  data() {
    return {
      inputValue: '',
      showPasscode: false,
    };
  },
  methods: {
    toggleShowPasscode() {
      this.showPasscode = !this.showPasscode;
    },
    Authenticate() {
      this.$emit('authenticate', this.inputValue);
    },
  },
  async mounted() {
    if (fyo.store.isDevelopment) {
      // @ts-ignore
      window.ds = this;
    }
  },
});
</script>
