<template>
  <div
    class="flex-1 flex justify-center items-center bg-gray-25"
    :class="{
      'window-drag': platform !== 'Windows',
    }"
  >
    <div class="w-form shadow-lg rounded-lg border relative bg-white">
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
          {{ t`Set your Passcode` }}
        </h1>
      </div>
      <hr />
      <div class="flex flex-col items-center">
        <div class="flex w-3/4 m-4 mb-1 relative">
          <div
            class="
              flex
              items-center
              justify-between
              text-gray-600 text-sm
              w-1/3
              p-2
            "
          >
            New Passcode<span>:</span>
          </div>

          <input
            :type="showPasscode ? 'text' : 'password'"
            v-model="passcode"
            class="
              text-base
              border border-gray-200
              focus:outline-none
              w-2/3
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
        <div class="flex w-3/4 m-4 mb-1 relative">
          <div
            class="
              flex
              items-center
              justify-between
              text-gray-600 text-sm
              w-1/3
              p-2
            "
          >
            Re-enter Passcode<span>:</span>
          </div>
          <input
            :type="showRePasscode ? 'text' : 'password'"
            v-model="confirmPasscode"
            class="
              text-base
              border border-gray-200
              focus:outline-none
              w-2/3
              p-2
              rounded
              placeholder-gray-500
            "
          />
          <button
            @click="toggleShowRePasscode"
            class="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            <Icon
              class="flex-shrink-0"
              :name="showRePasscode ? 'eye-hide' : 'eye-show'"
              size="8"
              :height="3"
            />
          </button>
        </div>
        <Button class="mx-auto my-5" @click="setPasscode()"> Confirm </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { t } from 'fyo';
import Button from 'src/components/Button.vue';
import Icon from 'src/components/Icon.vue';
import { showDialog } from 'src/utils/interactive';
import { fyo } from 'src/initFyo';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SetLock',
  components: {
    Button,
    Icon,
  },
  emits: ['set-passcode', 'change-db-file'],
  data() {
    return {
      passcode: '',
      confirmPasscode: '',
      showPasscode: false,
      showRePasscode: false,
    };
  },
  methods: {
    toggleShowPasscode() {
      this.showPasscode = !this.showPasscode;
    },
    toggleShowRePasscode() {
      this.showRePasscode = !this.showRePasscode;
    },
    async setPasscode() {
      if (this.passcode.length < 4) {
        await showDialog({
          title: this.t`Weak Passcode!`,
          type: 'error',
          detail: this.t`Your passcode should have atleast 4 characters!`,
        });
        return;
      }
      if (this.passcode !== this.confirmPasscode) {
        await showDialog({
          title: this.t`Passcode mismatch!`,
          type: 'error',
          detail: this
            .t`Passwords do not match. Please re-enter your passcode!`,
        });
        return;
      }
      this.$emit('set-passcode', this.passcode);
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
