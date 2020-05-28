<template>
  <button class="btn" @click="$emit('onClick')">
    <div class="content">{{action}}</div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    action: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/parts/variables.scss";

.btn {
  background: $button-color;
  height: 40px;
  min-width: 94px;
  border: none;
  padding: 0 21px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 1s;

  &:hover {
    background: $button-color-darker;
  }

  &:focus {
    outline: none;
    background: $button-color-darker;
  }
}

.content {
  color: white;
  font-size: 14px;
  font-weight: bold;
}
</style>
