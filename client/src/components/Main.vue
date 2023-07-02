<template>
  <div class="main" style="height: 100vh;">
    <v-container class="wrapper">
        <v-card class="nodesCard">
          <v-card-title @click="nodesClick">NODES</v-card-title>
          <div v-for="(item, key) in nodes" :key="item.id">
            <v-divider class="border-opacity-50" style="margin: 5px"></v-divider>
            <span style="color: rgb(128, 128, 128)">
              pool: {{ key }}
            </span>
            <div style="text-align: center; font-size: small; display: flex; flex-wrap: wrap; position: relative;">
              <v-card v-for="i in item" variant="flat" width="25px" :color="cardColor(i)" @mouseover="toContent(i)"
                @click="toMonitor(i)">
                <span style="color: rgb(128, 128, 128)">{{ i.ID }}</span>
                <v-overlay open-on-hover :scrim="false" absolute location-strategy="connected" activator="parent">
                  <app-badge :content="content"></app-badge>
                </v-overlay>
              </v-card>
            </div>
          </div>
        </v-card>
    </v-container>
    <v-container class="monitor" v-if="monitoringNodes.length">
      <div class="monitorCard">
        <v-card-title @click="monitoringNodes = []">Monitor</v-card-title>
        <v-divider></v-divider>
        <div class="monitorNode">
          <v-card v-for="node in monitoringNodes" variant="outlined">
          <app-badge :content="node" />
        </v-card>  
        </div>
        
      </div>
    </v-container>
  </div>
</template>
  
<script>
import AppBadge from './AppBadge.vue'

export default {
  data() {
    return {
      isBadge: false,
      curr: null,
      cursor: {
        x: null,
        y: null
      },
      monitoringNodes: []
    }
  },
  computed: {
    nodes() {
      return this.$store.state.serverReport
    },
    tooltip() {
      return this.$store.state.tooltipInfo
    },
    content() {
      return this.$store.state.content
    }
  },
  methods: {
    toMonitor(item) {
      this.monitoringNodes.push(item)
      console.log(this.monitoringNodes)
    },
    nodesClick() {
      this.isBadge = false
      this.curr = null
    },
    toContent(item) {
      this.$store.commit('setContent', item)
      this.curr = item.ID
    },
    cardColor(item) {
      let color = "rgba(192, 75, 75, 0.5)"
      if (item.TASKS) color = "rgba(75, 75, 192, 0.5)"
      if (item.MASTER) color = "rgba(75, 192, 75, 0.5)"
      return color
    }
  },
  components: {
    AppBadge
  }
}
</script>
  
<style scoped>
.nodes {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.node {
  min-width: none;
  width: 100%;
  margin-right: 10px;
  margin-left: 10px;
  border: 2px solid rgba(128, 128, 128, 0.5);
  border-radius: 5px;
  text-align: center;
}

.main {
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  max-width: none;
  justify-content: start;
}

.wrapper {
  max-width: none;
  width: 40%;
  min-width: 395px;
  margin: 0px;
}

.nodesCard {
  padding: 10px;

}
.monitor{
  display: flex;
  flex-wrap: wrap;
}
.monitorNode{
  margin: 5px;
}
.monitorCard{
  overflow-y: auto;
  position: relative;
}
</style>