import { reactive } from "vue";
import {io} from "socket.io-client";
import { store } from '@/store'
import router from "./router";

export const state = reactive({
  connected: false,
  message: "",
  log: "",
  pass: "",
  report: {},
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://10.201.8.152:3003";
export const socket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,                
});
socket.on("connect", () => {
  store.commit('connected')
  const token = localStorage.getItem('token')
  if (token) {
    socket.emit('auth', {token:token})
    socket.on('setLog', (log) => {
      store.state.user.log = log
    })
  }
  else socket.emit('auth', store.state.user)
});

socket.on("disconnect", () => {
  store.commit('disconnected')
  router.push('/')
});

socket.on("message",(data) => {
  store.state.serverMessage = data
})

socket.on("report", (mess) =>{
  store.commit('report',mess.message)
})

socket.on('loadStat', (stat) => {
  store.commit('setLoadStat', stat)
})
socket.on('token', (token) => {
  localStorage.setItem('token', token)
})