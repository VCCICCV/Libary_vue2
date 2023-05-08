import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import Cookies from 'js-cookie'
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.config.productionTip = false
Vue.use(SlideVerify);
Vue.use(Cookies)
Vue.use(ElementUI,{size:'mini'});// medium small mini
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
