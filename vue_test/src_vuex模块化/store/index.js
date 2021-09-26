// 用来创建Vuex中核心store
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import nanoid from 'nanoid'
Vue.use(Vuex)

// 准备actions--用于响应组件动作
// 业务逻辑只写在actions里 mutations只做运算

// 模块化分类 便于维护管理
const countAbout ={
    // 开启命名空间 导出模块
    namespaced:true,
    actions:{
        addOdd(context,value){
            if (context.state.sum % 2 != 0) 
            context.commit('ADDODD',value)
    
        },
        addWait(context,value){
            setTimeout(() => {
                context.commit('ADDWAIT',value)
              }, 1000);
        }
    },
    mutations:{
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
    },
    state:{
    sum: 0,

    },
    getters:{
        tensum(state){
            return state.sum*10
        }
    }
}
const personAbout ={
    namespaced:true,
 
    actions:{
        shuosaohua(context){
            axios.get("http://xu.study/36xujh/public/index.php/xujh_forum/getCars").then(
                res=>{
                    let num = Math.floor(Math.random()*3)
                    context.commit("SHUOSAOHUA",res.data[num].brand)
                },
                error=>{
                    context.commit("SHUOSAOHUA",error.message)
                }
            )
        }
       
    },
    mutations:{
        ADDPERSON(state,v){
            state.personList.push(v)
        },
        SHUOSAOHUA(state,v){
            state.saohua = v
        }
    },
    state:{
        personList:[
            {name:"张三",id:1},
            {name:"李四",id:2}
        ],
        saohua:''
    },
    getters:{
        //骚话反转
        reverseSaohua(state){
            console.log(state)
            if(state.saohua){
                state.saohua= state.saohua.split('').reverse().join('')
            }
        }
        
    }
}
// 创建导出 store

export default new Vuex.Store({
    // 导出模块
    modules:{
        countAbout,
        personAbout
    }
})
