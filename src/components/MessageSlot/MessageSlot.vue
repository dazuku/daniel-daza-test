<template>
  <div class="message-slot">
    <img :src="avatar" class="avatar"/>
    <div class="user-message">
      <div class="title">{{username}} <span class="detail">{{formmatedDate}}</span></div>
      <Message
        class="message-line"
        v-for="(message, index) in messages"
        :key="index"
        :variety="message.type"
        :text="message.text"
        :url="message.url"
        :alt="message.alt"
      />
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
import { avatarUrlByUsername, getFormattedHour } from '../../utils';

export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },

  components: {
    Message,
  },

  computed: {
    avatar() {
      return avatarUrlByUsername(this.username);
    },
    formmatedDate() {
      return getFormattedHour(this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  &-slot {
    display: grid;
    grid-template-columns: 40px auto;
    column-gap: 10px;
    margin-bottom: 24px;
  }

  &-line {
    margin-top: 4px;
  }
}
.avatar {
  width: 40px;
  height: 40px;
  background-color: lightgrey;
  border-radius: 6px;
}
</style>
