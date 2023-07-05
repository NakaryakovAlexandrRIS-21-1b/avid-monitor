<template>
  <q-page class="flex">
    <div class="q-ma-md nodes card">
      <div v-for="pool in getReport" :key="pool" class="q-ma-md flex row inline card ">
        <div v-for="node in pool" :key="node.id" class="node" :style="{'background-color':colorPicker(node)}" @click="addNode(node)">
          {{ node.id }}
        </div>
      </div>
    </div>
    <div class="q-ma-md card">
      <p>Monitor</p>
      <q-separator></q-separator>
      <div class="flex row" v-if="curIds.size">
         <nodeCard v-for="nodeId in curIds" :node="nodeId" />
      </div>
    </div>
  </q-page>
</template>

<script>
import nodeCard from 'src/components/nodeCard.vue';
import { mapGetters } from 'vuex';
export default{
  data(){
    return{
      curIds: new Set()
    }
  },
  methods:{
    colorPicker(node){
      if(node.tasks) return 'rgb(75, 75, 192)'
      if(node.job_master) return 'rgb(75, 192, 75)'
      return 'rgb(192, 75, 75)'
    },
    addNode(id){
      this.curIds.add(id)
    }
  },
  computed:{
    ...mapGetters(['getReport']),

  },
  components:{
    nodeCard
  }
}
</script>

<style lang="scss">
/* .pool{

} */
.nodes{
  min-width: 400px;
  width:40%;

}
.node{
  width: 25px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
