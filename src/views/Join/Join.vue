<template>
  <div class="chat">
    <div class="box">
      <h1>Join chat</h1>
      <div class="form-container">
        <div class="title">Please enter your username</div>
        <input type="text" class="username-input" v-model="username"/>
      </div>
      <div class="button-container">
        <Button action="Next" @onClick="join" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../../components/Button';

export default {
  components: {
    Button,
  },
  data() {
    return {
      username: '',
    };
  },
  methods: {
    join() {
      this.$store.dispatch('setUser', {
        username: this.username,
      });

      this.$router.push('/chat');
    },
  },
};
</script>

<style lang="scss" scoped>
$component-padding: 40px;

.chat {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.box {
  padding: $component-padding;
}
.form-container {
  margin: $component-padding 0;
}
.username-input {
  margin-top: 4px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
