import VueRouter from 'vue-router'
import School from '@/pages/School'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import MsgDetail from '@/pages/MsgDetail'
import Newsdetail from '@/pages/Newsdetail'

export default new VueRouter({
    routes:[
        {
            path:'/school',
            component:School
        },
        {
            path:'/home',
            component:Home,
            children:[
                { 
                    path:'news',
                    component:News,
                    // params 传参
                    children:[{
                        name:'xinwen',
                        path:'newsdetail/:id/:title',
                        component:Newsdetail
                    }
                    ]
                },
                {
                    path:'message',
                    component:Message,
                    children:[
                        {
                            path:'msgdetail',
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