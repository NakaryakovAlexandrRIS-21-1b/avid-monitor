import {createStore} from 'vuex'
import report from "../assets/nodes.json"

// function objToArr(obj){
//   const keys = Object.keys(obj)
//   const arr = []
//   keys.forEach(key => {
//     obj[key].forEach(element => {
//       arr.push(element)
//     });
//   });
//   return arr
// }

export default createStore({
  state:{
    serverReport: report.pools,
    loadStat: {
      labels: [1,2,3,4,5],
      cpu: [0,50,75,40,100],
      ram: [40,90,30,52,15],
      nodes: [4,7,2,8,10],
      jobs: [1,0,2,5,0],
      wait: [1,1,0,2,1]
    },
    // nodes: []
  },
  getters:{
    getReport: (s) => s.serverReport,
    // getNodeById: (s) => (id) => s.nodes.find(el => el.id === id)

  },
  mutations:{
    // setNodes(s){
    //   s.nodes = objToArr(s.serverReport)

    // }
  }
})





// function inCartIdx(s, id) {
//   let idx = -1
//   s.cart.forEach((c, i) => {
//     if(c.id == id) {idx = i}
//   })
//   return idx
// }

// export const cart = {
//     state:()=> ({
//         cart: []
//     }),
//     getters: {
//         getSumm(s) {
//             let sum = 0
//             if (s.cart) {
//                 s.cart.forEach((it) => {
//                 sum = sum + parseInt(it.price) * it.count
//                 })

//                 }


//             return sum
//         },

//         getCart: (s) => s.cart,
//         getIdx: (s) => (id) => inCartIdx(s, id)
//     },
//     mutations: {

//         add(s, item) {

//             let idx = inCartIdx(s, item.id)
//             if (idx == -1) {
//                 item.count = 1
//                 s.cart.push(item)
//             }
//             else {
//                 s.cart[idx].count++
//             }
//             s.last = item.id
//         },
//         clear(s) {
//             s.cart = []

//         }
//     }

// }
