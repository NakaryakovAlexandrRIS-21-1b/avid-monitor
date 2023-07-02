<template>
  <div class="wrapper">
    <v-sheet :elevation="10" border rounded class="content">
      <v-img src="../assets/logo.png"/>
      <v-form>
        <v-text-field class="input" label="Login" hide-details="auto" v-model="user.log"/>
        <v-text-field class="input" label="Password" type="password" v-model="user.pass"/>
        <v-btn @click="logIn">Log In</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import {socket} from '@/socket'
export default {
  data() {
    return {
      user:{
        log: "",
        pass: ""
      }
    }
  },
  methods:{
    logIn(){
      this.$store.commit('onLogin', this.user)
      this.$router.push('/home')
      //socket.connect()
      //socket.emit("auth",this.$store.state.user)
    },

  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}

.input {
  margin-top: 10px;
}

.content {
  padding: 20px;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

}
</style>