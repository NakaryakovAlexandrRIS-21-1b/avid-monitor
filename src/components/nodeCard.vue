<template>
  <div class="card" v-if="node">
    <p>{{ node.issued_to }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data(){
    return{

    }
  },
  computed:{
    // ...mapGetters(['getNodeById']),

    //node(){return this.$store.getters.getNodeById(this.id)}
  },
  props:['node'],
  mounted(){
    //this.$store.commit('setNodes')
  }
}
</script>

<style lang="scss" scoped>

</style>
