<template>
  <div class="btn-container">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="message"
      @keyup.enter="sendMessage"
    />
    <button class="btn-send" @click="sendMessage">Send</button>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { getGifByTag } from '../../utils';

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Message',
    },
  },

  data() {
    return {
      message: '',
      commands: [{
        cmd: 'gif',
        action: getGifByTag,
      }],
    };
  },

  methods: {
    checkIsTyping: debounce(function callback() {
      this.$socket.emit('typing', false);
    }, 1000),
    getCommandResult(message) {
      const command = this.commands
        .slice(0)
        .map((cmd) => ({
          ...cmd,
          result: new RegExp(`/${cmd.cmd} (.*)`, 'gi').test(message),
          tag: new RegExp(`/${cmd.cmd} (.*)`, 'gi').exec(message),
        }))
        .find(({ result }) => result);

      if (!command) {
        throw new Error('Command was not found!, can you please check again?');
      }

      const [, tag] = command.tag;
      return command.action(tag);
    },
    async sendMessage() {
      const [firstChar] = this.message;
      const isCommand = firstChar === '/';
      const emitData = {
        type: 'text-message',
        value: this.message,
      };

      if (isCommand) {
        try {
          const result = await this.getCommandResult(this.message);

          emitData.type = 'image-message';
          emitData.value = result;
        } catch (error) {
          this.$emit('setErrorMessage', error.message);

          return;
        }
      }

      this.$emit('onSend', emitData);

      this.message = '';
    },
  },

  watch: {
    message() {
      this.$socket.emit('typing', true);
      this.$emit('setErrorMessage', '');

      this.checkIsTyping();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/parts/variables.scss";

.btn {
  &-send {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background: none;
    border: none;
    color: $simple-button-color;
    font-size: 14px;
    cursor: pointer;
    transition: color 1s;
    padding: 0 14px;

    &:hover {
      color: $simple-button-color-darker;
    }
  }

  &-container {
    position: relative;
    margin-bottom: 8px;
  }
}
</style>
