const mixin = {
    data(){
        return {
            a:100,
            b:0
        }
    },
    methods:{
        showMsg(){
            console.log("混合！")
        }
    },
    mounted(){
        console.log("Mounted!!!!!!!!")
        
    }
   
}
export {mixin}