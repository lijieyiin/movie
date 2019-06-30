import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MintUI from 'mint-ui';
import './assets/css/style.css';
import { Header } from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';
import "./assets/icon/iconfont.css"
import "./assets/mui/css/mui.css"
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import { Navbar} from 'mint-ui';
import { Search } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import $ from "jquery/dist/jquery.js";
import { Picker } from 'mint-ui';
import 'swiper/dist/css/swiper.css';

import vant from 'vant';
import 'vant/lib/button/style'
import 'vant/lib/index.css'
Vue.use(vant)
Vue.use(MintUI)
import { Button } from 'vant';
import { ActionSheet } from 'vant';
import { Popup } from 'mint-ui';
// 引入组件样式
import "./assets/mui/css/mui.css";


Vue.component(Popup.name, Popup);

Vue.use(ActionSheet);

Vue.use(Button);
Vue.use(VueJsonp)
Vue.use(router)
Vue.use(MintUI);
Vue.use(Lazyload);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
Vue.component(Button.name, Button);
Vue.component(Header.name, Header); //或 Vue.use(Header)
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.component(Navbar.name, Navbar);
Vue.component(Search.name, Search);
Vue.component(Picker.name, Picker);


// 引入时间模块
import moment from "moment";
// 编写全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD"){
  return moment(dataStr).format(pattern)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  const type = to.meta.type
  console.log(from.meta+"----")
  // 判断该路由是否需要登录权限
  if (type === 'login') {
    if (sessionStorage.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})