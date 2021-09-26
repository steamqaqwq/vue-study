import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
Vue.config.productionTip = false;
Vue.use(VueRouter)

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