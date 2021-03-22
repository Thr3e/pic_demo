import Vue from 'vue';
import App from './App.vue';
import store from './store';
import '@/assets/iconfont/iconfont.css';
import '@/assets/styles/index.scss';
import '@/assets/styles/font.css'

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
