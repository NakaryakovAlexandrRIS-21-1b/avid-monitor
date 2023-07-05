<template>
  <div class="wrapper">
    <div class="content q-pa-md rounded-borders">
      <q-img src="../../public/icons/favicon-128x128.png"/>
      <q-form class="q-gutter-md">
        <q-input outlined label="Log In" v-model="user.log"/>
        <q-input outlined label="Password" type="password" v-model="user.pass"/>
        <q-btn @click="logIn">Log In</q-btn>
      </q-form>
    </div>
  </div>
</template>

<script>
const log = console.log
// import {socket} from '@/socket'
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
      // TODO: класть юзера в стор, коннкет к сокету
      this.$router.push('/')

    },
  },
  mounted(){
    log('mounted')
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
  background-color: $dark;
  // border-radius: 10px;

}
</style>
