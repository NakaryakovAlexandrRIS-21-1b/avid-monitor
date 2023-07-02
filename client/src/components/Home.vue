<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer expand-on-hover rail permanent> 
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar color="primary">{{ this.$store.state.user.log?.slice(0,1).toUpperCase() }}</v-avatar>
          </template>
          <v-list-item-title v-text="this.$store.state.user.log"></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list density="compact" nav>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded
          @click="clickPage(item.text)">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script>
import { socket } from '@/socket'
export default {
  data() {
    return {
      items: [
        { text: 'Chart', icon: 'mdi-chart-line' },
        { text: 'Main', icon: 'mdi-flag' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Log Out', icon: 'mdi-logout-variant' },
      ],
      currentPage: "",
    }
  },
  methods: {
    clickPage(page) {
      
      if (page == "Log Out"){
        this.logOut()
        this.$router.push(`/`)
      }
      else{
        this.$router.push(`/home/${page}`)
        this.currentPage = page
      } 
    },
    logOut() {
      this.$store.dispatch('Logout')
      //socket.disconnect()
      this.$router.push('/')

    },
    rDrawer() {
      this.$store.commit('drawerVisible')
    },
    lDrawer() {
      this.leftDrawer = !this.leftDrawer
    }
  },
  computed: {
    computedLog() {
      return `You're logged in as ${this.$store.getters.getLog}`
    },
    connect() {
      return this.$store.state.connectionState
    },
  },
  watch: {
    connect(connect) {
      if (!connect) this.logOut()
    }
  }
}
</script>
