import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leftCollapse: false
  },
  mutations: {
    openCollapse(state) {
      state.leftCollapse = false;
    },
    closeCollapse(state) {
      state.leftCollapse = true;
    }
  },
  actions: {
  },
  modules: {
  },
});
