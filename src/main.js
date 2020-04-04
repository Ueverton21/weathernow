import Vue from 'vue';
import App from './App';
import router from './routes';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
