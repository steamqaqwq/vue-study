import VueRouter from 'vue-router'
import School from '@/pages/School'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import MsgDetail from '@/pages/MsgDetail'
import Newsdetail from '@/pages/Newsdetail'

const router = new VueRouter({
    mode:'history',// 去除url 中的 '#'
    routes:[
        {
            path:'/school',
            component:School,

            meta:{
                title:'学校',
             isAuth:true,

            }
        },
        {
            path:'/home',
            component:Home,
            meta:{
                title:'家',
              },
            children:[
                { 
                    path:'news',
                    meta:{
                         title:'新闻',
                        isAuth:true,
                       },
                    component:News,

                    // params 传参
                    children:[{
                        name:'xinwen',
                        meta:{
                            title:'新闻详情',
                          },
                        path:'newsdetail/:id/:title',
                        component:Newsdetail
                    }
                    ]
                },
                {
                    path:'message',
                    component:Message,
                    meta:{
                        title:'消息页面',
                      },
                    children:[
                        {
                            title:'',
                            path:'msgdetail',
                            meta:{
                                title:'消息详情',
                              },
                            component:MsgDetail,
                               // props 接受参数
                            props(route){
                                return {
                                    id:route.query.id,
                                    title:route.query.title
                                }
                            }
                        }
                    ],
                 
                },
            ]
        }
    ]
})

// 全局前置路由守卫——初始化的时候被调用、每次路由切换的时候被调用
router.beforeEach((to,from,next)=>{
    console.log('前置路由守卫',to,from)
    // 判断是否需要校验 校验meta中的isAuth
    if(to.meta.isAuth){
        if(localStorage.getItem("num")==1){
            next();
        }
        else{
            alert("无权查看")
        }
    }else{
        next()
    }
})

// 全局后置路由守卫——初始化的时候被调用、每次路由切换的时候被调用
router.afterEach((to,from)=>{
    console.log('后置',to,from)
    document.title = to.meta.title
})
export default router