<template>
  <div>
    <div v-if="showLabel" :class="labelClasses">
      {{ df.label }}
    </div>
    <div tabindex="0" :class="[inputClasses, containerClasses]">
      <div class="flex items-center justify-between">
        <div
          v-if="value"
          class="w-3 h-3 rounded-full me-1"
          :style="{ backgroundColor: value }"
        ></div>
        <input
          type="text"
          class="focus:outline-none focus:bg-gray-100"
          :placeholder="inputPlaceholder"
          :value="value"
          style="padding: 0"
          @change="(e) => setColorValue(e.target.value)"
        />
        <input
          type="color"
          class="w-5 h-6"
          :placeholder="t`Custom Hex`"
          :value="value"
          @change="(e) => setColorValue(e.target.value)"
        />
      </div>
      </div>
  </div>
</template>

<script>
import Popover from 'src/components/Popover.vue';
import Base from './Base.vue';

export default {
  name: 'Color',
  components: {
    Popover,
  },
  extends: Base,
  methods: {
    setColorValue(value) {
      if (!value.startsWith('#')) {
        value = '#' + value;
      }
      if (/^#[0-9A-F]{6}$/i.test(value)) {
        this.triggerChange(value);
      }
    },
  },
};
</script>
