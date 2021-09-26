import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
Vue.config.productionTip = false;
Vue.use(VueRouter)
// 复杂事件总线
// const Demo = Vue.extend({})
// const d = new Demo()
// Vue.prototype.$bus = d
new Vue({
    el:'#root',
    render:h=>h(App),
    // 添加事件总线
    beforeCreate(){
        Vue.prototype.$bus = this
    }
    ,
    router
})