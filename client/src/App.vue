<template>
  <router-view />
</template>

<script>
import { socket } from './socket';

  export default{
    mounted(){
      const token = localStorage.getItem('token')
      if (token){
        socket.connect()
        this.$router.push("/home/main")
      }
    }
  }
</script>
