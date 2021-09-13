// 引入的是残缺版的Vue 没有模板解析器
import Vue from 'vue'
import App from './App.vue'
// 关闭Vue多余的提示
Vue.config.productionTip = false

new Vue({
    el:'#root',
    render: h => h(App)
    // render 用来渲染元素 因为模板解析器缺失
    //全写↓↓
    // render(createElement){
    //     return createElement(App)
        // return createElement('h2','hello')
    // }
})