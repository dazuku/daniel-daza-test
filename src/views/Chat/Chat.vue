<template>
  <div class="chat">
    <div class="box">
      <div class="messages" ref="messagesContainer">
        <div v-if="messages.length == 0">There no message please start a conversation</div>
        <MessageSlot
          v-else
          v-for="(message, index) in messages"
          :key="index"
          :username="message.username"
          :messages="message.messages"
          :date="message.date"
        ></MessageSlot>
      </div>
      <div class="btn">
        <MessageInput
          @onSend="sendMessage"
          @setErrorMessage="setError"
        ></MessageInput>
        <div class="detail users-typing" :class="{ 'error-msg': Boolean(error) }">
          {{error || typingMessage}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageSlot from '../../components/MessageSlot';
import MessageInput from '../../components/MessageInput';

export default {
  components: {
    MessageSlot,
    MessageInput,
  },
  data() {
    return {
      message: '',
      typingUsers: [],
      error: '',
    };
  },
  methods: {
    onTyping(typers) {
      this.typingUsers = Object.keys(typers)
        .filter((key) => typers[key])
        .map((key) => (key === this.username ? 'You' : key));
    },
    onMessage(message) {
      this.$store.dispatch('addMessage', {
        ...message,
        date: new Date(message.time),
      });
    },
    sendMessage({ type, value }) {
      this.$socket.emit(type, value);
    },
    setError(error) {
      this.error = error;
    },
  },
  beforeMount() {
    this.$socket.on('message', this.onMessage);
    this.$socket.on('is-typing', this.onTyping);
  },
  beforeDestroy() {
    this.$socket.off('message');
    this.$socket.off('is-typing');
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    typingMessage() {
      if (this.typingUsers.length === 0) return ' ';

      const tobeConjugation = this.typingUsers.length > 1 || this.typingUsers[0] === 'You' ? 'are' : 'is';
      const people = this.typingUsers.length > 2 ? 'Several people' : this.typingUsers.join(', ');

      return `${people} ${tobeConjugation} typing...`;
    },
    messages() {
      return this.messagesGroupByDate.map((messages) => ({
        ...messages[0],
        messages,
      }));
    },
    messagesGroupByDate() {
      const dictionary = this.$store.state.messages.reduce((acc, message) => {
        const time = new Date(message.time);
        time.setSeconds(0, 0);
        const millis = time.getTime();
        const key = `${millis}-${message.username}`;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(message);

        return acc;
      }, {});

      return Object.keys(dictionary).map((key) => dictionary[key]);
    },
  },
  updated() {
    this.$nextTick(() => {
      const { messagesContainer } = this.$refs;

      messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/parts/variables.scss";

$component-padding: 24px;

.chat {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.box {
  padding: $component-padding $component-padding 0 $component-padding;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn {
  padding-top: $component-padding;
}

.messages {
  overflow-y: scroll;
}

.users-typing {
  margin: 8px 0;
  height: 14px;
}

.error-msg {
  color: $error-color;
}
</style>
