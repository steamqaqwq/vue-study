// 用来创建Vuex中核心store
import Vue from 'vue'
import Vuex from 'vuex'
// import nanoid from 'nanoid'
Vue.use(Vuex)

// 准备actions--用于响应组件动作
// 业务逻辑只写在actions里 mutations只做运算
const actions ={
    // 简单逻辑 可以直接提交
    // add(context,value){
    //     context.commit('ADD',value) 
    // },
    // jian(context,value){
    //     context.commit('JIAN',value)
    //     console.log(context)
    // },
    addOdd(context,value){
        if (context.state.sum % 2 != 0) 
        context.commit('ADDODD',value)

    },
    addWait(context,value){
        setTimeout(() => {
            context.commit('ADDWAIT',value)
          }, 1000);
    }
}
// 准备mutations--用于操作数据(state)
const mutations ={

    ADD(state,value){
        state.sum+=value        
    },
    JIAN(state,value){
        state.sum-=value        
    },ADDODD(state,value){
        state.sum+=value        
    },ADDWAIT(state,value){
        state.sum+=value        
    },
    ADDPERSON(state,v){
        state.personList.push(v)
    }
}
// 准备state --用于存储数据
const state = {
    sum: 0,
    personList:[
        {name:"张三",id:1},
        {name:"李四",id:2}
    ]
}
const getters ={
    tensum(state){
        return state.sum*10
    }
}
// 创建导出 store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
