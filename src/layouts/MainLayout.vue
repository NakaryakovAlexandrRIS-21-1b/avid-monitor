<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer :model-value=true :breakpoint="breakpoint" mini>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary">U</q-avatar>
          </q-item-section>
          <q-tooltip self="center right">
            Пользователь
          </q-tooltip>
        </q-item>
        <q-separator />
        <q-item v-for="item in menuPages" :key="item.title" clickable @click="menuClick(item.name)">
          <q-item-section avatar>
            <q-avatar :icon="item.icon">
              <q-badge v-if="item.text==='Уведомления'" color="red" rounded floating label="4"/>
            </q-avatar>
          </q-item-section>
          <q-tooltip self="center right">
            {{ item.text }}
          </q-tooltip>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      breakpoint: 0,
      notificationAlert: false,
      searchAlert: false,
      searchString: null,
      menuPages: [
        {
          name: 'search',
          icon: 'mdi-magnify',
          text: 'Поиск'
        },
        {
          name: 'notifications',
          icon: 'mdi-bell',
          text: 'Уведомления'
        },
        {
          name: 'chart',
          icon: 'mdi-chart-line',
          text: 'График'
        },
        {
          name: 'main',
          icon: 'mdi-flag',
          text: 'Мониторинг',
        },
        {
          name: 'audience',
          icon: 'mdi-account',
          text: 'Чат'
        },
        {
          name: 'tasks',
          icon: 'mdi-calendar-check',
          text: 'Задачи'
        },
        {
          name: 'logout',
          icon: 'mdi-logout-variant',
          text: 'Выход'
        },

      ]

    }
  },
  methods:{
    logOut(){
      // TODO: написать функцию очищения пользователя и дисконнекта от сокета
      this.$router.push('/auth')
    },
    menuClick(page){
      if(page==="notifications"){
        this.notificationAlert = !this.notificationAlert
        return
      }
      if(page==="search"){
        this.searchAlert = !this.searchAlert
        return
      }
      if(page==='logout'){
        this.logOut()
        return
      }
      if(page==='main'){
        this.$router.push('/')
        return
      }
      this.$router.push(`${page}`)
    }
  },

}
</script>
