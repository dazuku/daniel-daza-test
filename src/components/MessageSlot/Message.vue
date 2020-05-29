<template>
  <div class="message">
    <div v-if="variety === 'text'">{{text}}</div>
    <div v-else><img class="gif" :src="url" :alt="alt"/></div>
  </div>
</template>

<script>
export default {
  props: {
    variety: {
      type: String,
      validator(variety) {
        return ['text', 'image'].includes(variety);
      },
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.gif {
  width: 100%;
}
</style>
