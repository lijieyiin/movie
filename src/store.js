import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filmData:null,
    movieId:null,
    cinemaImg:null,   
    cinemaId:null,
    showbottomNav:true,
    dataUrl:'http://192.168.43.164:3000/',
    cinemaDateilContent:null,
    wantToOrder:null,
    payOk:[],
  },
  mutations: {
    wantToOrder(state,obj){
        this.state.wantToOrder = obj;
    },
    payOk(state,obj){
      this.state.payOk.push(state.wantToOrder)
    }
  },
  actions: {}  
});
