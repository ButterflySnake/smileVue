// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Cell,CellGroup,Tabbar,TabbarItem,Stepper,PullRefresh,Tab,Tabs,Button,Row,Col,Search,Swipe,SwipeItem,Lazyload,List,Field,NavBar} from 'vant'
Vue.use(Cell).use(CellGroup).use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
