import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

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
})