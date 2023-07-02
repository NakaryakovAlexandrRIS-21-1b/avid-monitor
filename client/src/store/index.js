import { createStore } from "vuex";
import report from "../../../test_date/config.json"
export const store = createStore({
  state: {
    user: {
      log: null,
      pass: null,
    },
    connectionState: false,
    serverMessage: "",
    serverReport: report.pools,
    loadStat: {
      labels: [1,2,3,4,5],
      cpu: [0,50,75,40,100],
      ram: [40,90,30,52,15],
      nodes: [4,7,2,8,10],
      jobs: [1,0,2,5,0],
      wait: [1,1,0,2,1]
    },
    tooltipInfo: {
      ID: null,
      CPU: null,
      JOBNAME: null,
      MASTER: null,
      NODES: null,
      RAM: null,
      SLAVES:null,
      SWAP: null,
      TASKS: null
    },
    content: {
      ID: null,
      CPU: null,
      JOBNAME: null,
      MASTER: null,
      NODES: null,
      RAM: null,
      SLAVES:null,
      SWAP: null,
      TASKS: null
    },
  },
  getters: {
    isAuth(state) {
      const token = localStorage.getItem('token') ?? false;
      if(!token) return state.user.log ?? false
      else return "token"
    },
    getLog(state){
      return state.user.log
    }
  },
  mutations: {
    onLogin(state, { log, pass }) {
      state.user.log = log
      state.user.pass = pass
    },
    onLogout(state) {
      state.user.log = null
      state.user.pass = null
      localStorage.removeItem('token')
    },
    connected(state) {
      state.connectionState = true
    },
    disconnected(state) {
      state.connectionState = false
    },
    report(state, report) {
      state.serverReport = report
    },
    setLoadStat(state, stat) {
      state.loadStat = {
        labels: [],
        cpu: [],
        ram: [],
        nodes: [],
        jobs: [],
        wait: []
      }
      stat.forEach(item => {
        state.loadStat.labels.push(item.date.replace("T", " ").replace(":00.000Z", ""))
        state.loadStat.cpu.push(item.cpu)
        state.loadStat.ram.push(item.ram)
        state.loadStat.nodes.push(item.nodes)
        state.loadStat.jobs.push(item.jobs)
        state.loadStat.wait.push(item.wait.split(":")[0])
      })
    },
    setTooltipInfo(state, info){
      state.tooltipInfo = info
    },
    setContent(state, info){
      state.content = info
    }
  },
  actions: {
    async Logout({ commit }) {
      setTimeout(commit("onLogout"), 2000);
    },
  },
});
