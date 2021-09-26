# vue-study
Vuejs

### vue 前言

vue： **渐进式**js框架  由浅入深  帮你操作DOM  

vue特点

1. **组件化**,提高复用
2. **声明式**编码,无需操作dom (非命令式js)
3. **虚拟DOM+diff算法**
   - 虚拟创建DOM缓存
   - 用diff算法在缓存基础上增删改查
   - ![image-20210831205923165](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210831205923165.png)





### 一、vue模板 

1. 容器
2. 创建Vue实例
3. 模板替代

istance=实例

{{}} 内部可以使用js表达式

1. js表达式：一个表达式可以生成一个值Date.now()
2. js代码：if for...

![](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901103706221.png)

### 二、Vue绑定指令

​	插值语法,指令语法

![image-20210906154744043](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906154744043.png)

​	绑定↓

1. v-bind:href  简写 :href  会变为js表达式  **单向数据绑定**
2. v-model  **双向数据绑定**  得是输入类元素（有value值)可以产生交互才可用
   - 简写 v-model:value="name"  ==>   v-model="name"
3. ![image-20210901105514985](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901105514985.png)

### 三、el和data的两种写法

![image-20210901161705956](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901161705956.png)

函数式:

```js
new Vue({
    el:"#box",
    data(){
        return {
            name:"xu"
        }
    }
})
```

### 四、MVVM模型

- M：模型（Model): data中的数据
- V：视图(View): 模板
- VM：视图模型(ViewModel)：Vue实例对象

![image-20210901163752705](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901163752705.png)

![image-20210901164203081](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901164203081.png)

- data中所有属性，vm上都会有
- vm上所有属性 及其 Vue原型上所有属性,在Vue模板都可以直接使用

### 五、Vue中数据代理

- **Object.defineProperty**

vm数据为何需要点击才能显示?

![image-20210901165810361](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901165810361.png)

**本质就是用Object.defineProperty定义数据**使得数据读取或修改时受监听

```js
let sex = '男';
let student = {
    name: 'xu',
    age: 18
};
Object.defineProperty(student, 'sex', {
    // value: '男',
    enumerable: true, //属性是否可枚举,默认false
    // writable: true, //属性是否可被修改,默认false
    configrable: true, //属性是否可被删除,默认false

    //用访问器 则不可用value writable正常改写
    get() {
        console.log('获取数据');
        return sex;
    },
    set(value) {
        console.log('修改数据值为', value);
        sex = value;
    }
});
```

![image-20210901173517397](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901173517397.png)

**Vue中的数据代理**

```js
let vm = new Vue({
    el: '#box',
    data: {
        url: 'http://www.baidu.com',
        address: '192.158.12.11'
    }
});
console.log(vm);
```



-   vm实例上有![image-20210901204841228](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901204841228.png)

- _data 收集了data中的数据

- 然后用**访问器**获取_data中的数据![image-20210901205048368](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901205048368.png)实现数据代理(通过Object.defineProperty()吧data对象中所有属性添加到vm上)
- #访问器 getter setter

 数据代理的**好处**:更加方便操作data中的数据

 

###  六、事件处理

- #### 事件基本使用

![image-20210901211223109](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901211223109.png)

```html
<div id="box">
    <button @click="showinfo">普通按钮</button>
    <button v-on:click="showinfo2($event,66)">传参按钮</button>
</div>
<script>
    new Vue({
        el: '#box',
        data: {},
        methods: {
            showinfo(e) {
                console.log('非传参');
            },
            showinfo2(e, num) {
                console.log(num);
                console.log(e);
            }
        }
    });
</script>
```

- #### 事件修饰符

- **可以连着写 不过分先后**

![image-20210901223741534](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210901223741534.png)

```html
<div id="box">
    <!-- 阻止默认事件 -->
    <a href="baidu.com" @click="showInfo">按钮</a>

    <!-- 阻止事件冒泡 -->
    <!-- 没有.stop 会提示两次 -->
    <div @click="showInfo">
        <button @click.stop="showInfo">按钮2</button>
    </div>
</div>
```



事件捕获(外往内)→事件冒泡(由里到外处理事件) capture可以捕获时处理事件

```js
<div @click.capture="showInfo(1)"> //先执行
    <button @click="showInfo(2)">按钮2</button>
</div>
// 1
// 2
```

鼠标滚动   scroll / wheel

先执行绑定事件,再进行鼠标滚动 (用passive先滚动再执行)

- #### 键盘事件修饰符

- **键盘修饰符结合  keyup.ctrl.y  === ctrl+y**

keyup 与 keydown 

![image-20210903102221371](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210903102221371.png)

Vue.config.keyCodes.huiche = 13 //定义别名

### 七、计算属性

- **计算属性是属性!**<u>直接调用即可</u>

**定义：**要用的属性不存在，需要通过已有的属性进行计算

- 拿已有的属性来计算出的结果就是计算属性 

**原理：**借助Object.defineProperty方法提供的getter和setter

> 可通过插值语法、methods+插值、computed 横向对比理解

**特点：**与methods实现相比,内部有缓存机制,效率更高，调试方便。

- 缓存数据,不需要计算时会拿原有的结果,当依赖的数据变化时重新计算，最终计算属性会在vm上。
- 无法开启异步任务,需要返回值

完整写法：

```js
computed: {
    fullName: {
        //get有什么作用?读取fullName时会调用,返回值作为fullName的结果
        //get什么时候调用? 1.初次读取fullName时 2.所依赖数据发生改变
        get() {
            return this.firstName + '-' + this.lastName;
        },
            // set什么时候调用?fullName被修改的时候
         set(v) {
             //一般用于规范
             const arr = v.split('-');
             this.firstName = arr[0];
             this.lastName = arr[1];
         }
    }
}
});
```

setter效果

![gif9.3](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/gif9.3.gif)

**简写**（不需要set时,当函数写)

```js
computed: {
    fullName() {
        return this.firstName + '-' + this.lastName;
    }
}
```

### 八、监听属性

- watch 监视属性data、computed

```js
data: {
          temperature: 11
        },
watch: {
    temperature: {
        //   handler当属性发生变化时调用
        handler(cur, pre) {
            document.querySelector('span').innerHTML = `当前值为${cur},旧值为${pre}`;
            console.log(`当前值为${cur},旧值为${pre}`);
        }
    }
}
```

**watch的配置项**

- **handler函数**当前属性发生变化时调用  参数1 cur  参数2  pre

- **immediate属性**   值true/end   初始化时执行一次handler
- **deep属性** 值true/end   开启深度监视

**watch的第二种写法**

```js
vm.$watch('temperature',{
    immediate:true,
    handler(cur,pre){
        console.log(cur)
    }
})
```

**深度监视**

1. Vue中的watch默认不监视对象内部值的改变(一层)
2. 监视多级结构中某个属性的变化 需要是字符串形式  'numbers.a'
3. 监视整个结构中所有属性的变化 配置项**deep:true** 深度监视

```js
//深度监视所有属性
data: {
    nums: {
        a: 10,
            b: 20
    }
},
    watch: {
        //   'nums.a': { //单个监视
        //     handler(v) {
        //       console.log('a的值改变为', v);
        //     }
        //   }
        nums: {
            deep: true,
            handler(cur, pre) {
                console.log(cur.a);
            }
        }
    }
```

4. **watch的2种简写** 只需要 handler()时才能

监视的属性当函数用

```js
watch: {
    c(cur, pre) {
        console.log('c的旧值与新值', cur, pre);
    }
}
});
```

```js
vm.$watch("c",function(cur,pre){ //不可箭头函数
    console.log(xxxx)
})
```

​	5. 可以执行异步任务  #setTimeout

![image-20210903200704336](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210903200704336.png)

### 九、class样式动态绑定.

> :class="modelObj"

1. 字符串写法,适用于：样式的类名不确定,需要动态绑定

   - 根据需求绑定

2. 数组写法，适用于：要绑定的样式个数不确定、名字也不确定

   - 可以unshift()等数组操作增删改
   - 数组内样式同时使用

3. 对象写法，适用于：要绑定的样式个数确定、名字也确定，但需要根据实际判断启用

   - ```js
     modelObj: {
         borderSort: true,
         color2: true,
         size: false,
     }
     ```

style内联样式绑定

- 对象写法

```js
:style="styleObj"
styleObj:{
    fontSize:40px //font-size 去'-'驼峰命名
}
```

- 数组写法
  - 数组中得是样式对象

```js
:style="styleArr"
styleArr:[
    {
    fontSize:40px //font-size 去'-'驼峰命名
		},
        {
              backgroundColor:'blue'
}]
```

### 十、条件渲染

- v-show="表达式  true/false" 显示隐藏  //频率高
- v-if="表达式"  v-else-if  v-elsecc
  - 不允许打断   v-if  div  v-else-if

!!!**template**标签 不会打乱dom结构  (虚拟dom)

```html
<template v-if="n>=3"> //只能配合v-if 不能v-show
    <h2>sdfsdfsdf</h2>
</template>
```

![image-20210904112917462](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210904112917462.png)

没有template标签自动解析

### 十一、列表渲染

v-for 遍历数组

```js
<li v-for="item in persons">{{item.age}}</li>
data: {
    persons: [
        { id: 1, name: '张三', age: '18' },
        { id: 2, name: '李四', age: '15' },
        { id: 3, name: '王五', age: '33' }
    ]
},
```

v-for 遍历对象

```js
<li v-for="i,k of car">{{k}} -- {{i}}</li>
car: {
    name: '奥迪',
        price: '999',
            color: '黑'
}
```

- for in 得item,index值   for of 得value,key值

#### **key的原理**

> :key="key"

**个人理解：**	

​	key作为虚拟dom diff算法比较时的唯一标识,按key对比数据,相同复用,不同则产生新的真实dom 。没写key则Vue会自动将index作为默认key值,当出现破坏顺序的行为(增删),则无输入数值的dom效率低界面没问题,而需要输入数值的界面则会出错。

![image-20210904174955771](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210904174955771.png)

错误key值

![image-20210904175126335](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210904175126335.png)

正确key值

![image-20210904175313081](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210904175313081.png)

####  列表过滤(筛选)

**str.indexOf('') // 空字符可检索 默认为0**

- 配合过滤可以检索全部

1. Watch实现:

```js
watch: {
    filterV: {
        immediate: true,
        handler(cur) {
            let filters = this.persons.filter((item) => {
                return item.name.indexOf(cur) != -1;
            });
            this.personshow = filters;
        }
    }

```

2. computed实现:

```js
computed: {
    personshow() {
        return this.persons.filter((item) => {//属性的返回值
            return item.name.indexOf(this.filterV) != -1;//返回的数组
        });
    }
}
```



**vscode 小技巧**:

- //#region 开始折叠
- //#endregion结束折叠
- 可以强制折叠

#### 列表排序

- sort 会改变原数组 

```js
personshow() {
    // 先筛选后排序
    let arr = this.persons.filter((item) => {
        return item.name.indexOf(this.filterV) != -1;
    });
    //排序
    // return arr.sort((person1, person2) => {
    //   if (this.sortType == 2) {
    //     return person2.age - person1.age;
    //   } else if (this.sortType == 1) {
    //     return person1.age - person2.age;
    //   0.}
    // });
    //简写
    // 判断是否需要排序
    if (this.sortType) {
        arr.sort((p1, p2) => {
            return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age;
        });
    }
    return arr;
}
```

### 十二、数据监测原理!!!

先上一个Vue bug! :+1:

首先写一个更新数据的按钮和方法

```js
methods: {
    updateData() {
        this.persons[0].age = 20;
        this.persons[0].sex = '男';
    }
},
```

![GIF2021.9.5](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/GIF2021.9.5.gif)

当觉得一个一个改属性,不如一块改如下时

```js
methods: {
    updateData() {
        this.persons[0] = { id: 1, name: '张三', age: '20', sex: '男' };
    }
},
```

神奇的发现Vue中数据没有改变！但实际vm上的数据已经改变了!可以说是改了但没完全改。

![GIF2021-9-5.2](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/GIF2021-9-5.2.gif)

#### **底层数据监测原理**

需要一个中转站(Observer)来存储data变量 并为data对象中每一个属性(含嵌套)都进行监测(访问器)

再通过 vm._data = data = obsever 赋值给 _data 对象

模拟数据监测：

```js
let data = {
    name: '张三',
    sex: '男',
    age: 18
};
const obs = new Observer(data);
console.log(obs);

//   准备一个vm实例对象
let vm = {};
vm._data = data = obs;

function Observer(obj) {
    // 汇总数据
    const keys = Object.keys(obj);
    // 遍历
    keys.forEach((k) => {
        Object.defineProperty(this, k, {
            get() {
                return obj[k];
            },
            set(val) {
                obj[k] = val;
            }
        });
    });
}
```

<img src="https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210905164636844.png" alt="image-20210905164636844" style="zoom: 80%;" />看上去差不多,但和真实实现还是有差距

就比如Vue中 会自动在vm上创建一个和data属性中同样的属性名 数据代理

并且对Object属性进行深度递归，使得每个属性都有自己的访问器。

#### Vue.set()添加响应式数据：

Vue.set(target,key,value)

-  target不允许是vm的实例对象n以及vm的根数据对象vm._data等

vm.$set(target,key,value)同理

```js
Vue.set(vm._data.age,"李四",18)
通过数据代理
Vue.set(vm.age,"李四",18)
```



![image-20210905174340916](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210905174340916.png)

<img src="https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210905174307911.png" alt="image-20210905174307911" style="zoom: 80%;" />

<img src="https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210905174409769.png" alt="image-20210905174409769" style="zoom: 80%;" />

  vue数据监测总结

![image-20210905205632687](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210905205632687.png)

数据劫持→属性带有访问器

```js
 updateHobby() {
            //   splice(index,deleteNums,Add1newVal)
            this.student.hobby.splice(0, 1, '赛风');
            //splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。
            // Vue.set(this.student.hobby, 0, '新爱好');
          }
```

### 十三、收集表单数据

**小事项**

1. select 选择框绑定 select即可 而不是option
2. ~~v-model 是可以和value共存的~~
3. Vue勾选框(checkbox) 默认查询 checked值 true/false  一般设置value值
   - 若是多组勾选框(checkbox)则需要设置初始值为**数组** 字符串则是true/false
4. form 可以 @submit.prevent=""阻止
5. JSON.stringify()转成json格式数据
6. 最好把收集的数据整合到一个属性中 不要直接是根下的属性值

**v-model的三个修饰符**

- v-model.number 收集数字 一般和input type="number "和 一块使用
- v-model.lazy 失去焦点时才收集 常与textarea 配合
- v-model.trim 收集数据去掉多余空格

![image-20210905234442118](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210905234442118.png)

### 十四、过滤器(管道符)* vue3已删除

```js
{{time | timeFormat | sliceTime}}
//局部过滤器函数写在vm的filters
filters:{
    timeFormat(value){return },
    sliceTime(value){return }
}
//全局过滤器函数写在Vue
Vue.filter('timeFormat',function(value){return ...})
```

time作为timeFormat函数的默认参数→函数返回值再作为sliceTime的参数 最终返回值作为整个表达式的值

- timeFormat("YYYY:MM:DD")若已有参数 则变为2个参数timeFormat(value,"YYY..")

转换时间戳

第三方库 day.js

### 十五、内置指令+



![image-20210906150341112](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906150341112.png)

1. v-text="name"  只会当成正常文本解析,不如插值语法

![image-20210906150538532](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906150538532.png)

2. v-html="name" 支持解析标签 有**安全性问题**

   #### Cookie原理

   ![image-20210906151254313](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906151254313.png)

- 不允许跨游览器

document.cookie  可以获取页面cookie但必须没有httpOnly保护

![image-20210906152122801](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906152122801.png)

3. v-cloak 没有值 
   - 可以将未解析的模板暂时隐藏 vue实例创建完毕并接管容器时删除v-cloak属性
   - css [v-cloak]{display:none}

4. v-once  没有值
   - v-once所在节点初次渲染后，就视为静态内容
   - 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

5. v-pre 没有值
   - 使得Vue不去解析，加快编译

### 十六、自定义指令

![image-20210906154858169](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906154858169.png)

解析标签 == 操作DOM元素

```html
<div>当前数值为：{{n}}</div>
<div>指令放大十倍的数值为：<span v-big="n"></span></div>
```

```js
directives: {
    //big 何时调用? 1.指令与元素成功绑定(未渲染)(once) 2.指令数据发生变化时更新
    big(element, binding) {
        console.log(element, binding);
        element.innerText = binding.value * 10;
    }
}
```

![image-20210906160801962](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210906160801962.png)

(element)input.focus() 渲染后聚焦元素，所以需要生命周期指定时期执行函数

inserted(){} //指令所在元素被插入页面时

update(){}// 指令所在的模板被重新解析时

```js
directives: {
    fbind:{
        bind(element,binding),
        inserted(element,binding){},
        update(element,binding){} //bind 和 update一般一样
    }
}
```

指令名：

- 指令名不支持用驼峰命名  需要用'-'来分隔

- 指令名有'-'需要补双引号  如bigNumber  需要写成 'big-number'(element,binding){}

指令里(directives)的this是windows

全局指令: Vue.directive ()

```js
Vue.directive('fbind',{
    bind(),
    inserted(),
    update(e,b)
})
Vue.directive('big',function(e,b){
   	//.....
})
```

### 十七、生命周期!!!

生命周期函数

debugger;暂停调试

- mounted()
  - Vue完成模板解析并且把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
- 

![image-20210908211808935](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210908211808935.png)

<img src="https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210908212132061.png" alt="image-20210908212132061"  />

![image-20210908214132337](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210908214132337.png)

template 会替换整个root 容器

- template里必须有根元素 div包裹  不能用template标签当根元素 
- V3 解决只能包div问题 和template标签

![image-20210908221819897](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210908221819897.png)

beforeDestory 立遗嘱  不管怎么死的都会执行

```html
 <div id="app"></div>
    <script>
      Vue.config.productionTip = false;
      let vm = new Vue({
        el: '#app',
        template: `
            <div>
                <div>{{n}}</div>
                <button @click="destroyVm">byebye</button>    
            </div>
        `,
        data: {
          n: 1
        },
        methods: {
          destroyVm() {
            this.$destroy();
          }
        },
        // 初始化生命周期事件,还没有数据代理
        beforeCreate() {
          console.log(this);
          debugger;
          console.log('beforeCreate');
        },
        // 创建vm实例对象 初始化检测、数据代理
        created() {
          console.log('created');
        },
        //创建虚拟DOM,此时对未经Vue编译的DOM操作最终都不奏效
        beforeMount() {
          console.log('beforeMount');
        },
        // Vue完成模板解析并且把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
        mounted() {
          //重要钩子
          this.timer = setInterval(() => {
            this.n++;
            console.log(this.n);
          }, 1000);
          console.log('mounted');
        },
        // 新数据，旧页面
        beforeUpdate() {
          console.log('beforeupdate');
        },
        // 新数据，新页面，页面和数据保持同步
        updated() {
          console.log('updated');
        },
        // vm中所有 data,methods 指令都可用，无法更新数据。用来执行一些关闭定时器等收尾工作。
        beforeDestroy() {
          //重要钩子
          clearInterval(this.timer);
          console.log('beforeDestroy');
        },
        destroyed() {
          console.log('byebye');
        }
      });
    </script>
```

### 十八、 组件

#### 组件理解

 传统编写网页存在问题

1. 依赖关系混乱，不好维护
2. 代码复用率不高 （非复制）

![image-20210909105815046](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909105815046.png)

组件——实现应用中局部功能代码和资源的集合

![image-20210909110111542](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909110111542.png)

![image-20210909110248851](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909110248851.png)

与模块的区别：

- 模块只针对js文件，简化js的编写,提高运行效率（拆分js)
- 组件 复用编码，简化项目编程，提高运行效率

#### 组件的使用 -- 非单文件

非单文件组件

- 一个文件中含n个组件  .html内写

单文件组件

- 一个文件中只包含1个组件 .vue

组件三部曲

1. 创建组件

2. 注册组件+模板

   - 局部注册：配置项components: {school: school }

   - 全局注册： Vue.component('school',school)

3. 组件标签

```js
//创建组件
      const school = Vue.extend({
        template: `
        <div>
            <h2>学校：{{name}}</h2>
        </div>
        `,
// el: '#app',  不能有el配置,最终所有组件都归vm管理,vm决定组件使用位置
        data() {
          // 使数据独立 修改对象属性数据会联动
          return {
            name: '岭师'
          };
        },
        methods: {}
      });
      new Vue({
        el: '#app',
        //注册组件（局部注册）
        components: {
          school: school
        }
      });
```

#### 组件注意事项

![image-20210909212209092](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909212209092.png)

#### 组件嵌套

- 一般应用开发  用app组件来管理其他组件  root只需负责app组件

```js
const app = Vue.extend({
        template: `
            <div>
                <hi></hi>
                <school></school>
            </div>  
          `,
        components: {
          school,
          hi
        }
      });
new Vue({
    template: '<div><app></app></div>',
    el: '#root',
    data: {},
    methods: {},
    components: {
        app
    }
});
```



![image-20210909231035068](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909231035068.png)

![image-20210909231424655](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909231424655.png)

#### VueComponent构造函数

![image-20210909232051196](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210909232051196.png)

调用Vue.extend返回的都是个全新VueComponent 

- 源码剖析 摘取部分源码  不难看出每次调用一个新的VueComponent 初始化组件并返回

- ```js
  Vue.extend = function (extendOptions) {
        .....
        var Sub = function VueComponent (options) {
          this._init(options);
        };
      	....
        return Sub
      };
    }
  ```

![image-20210910094041880](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210910094041880.png)

#### ！！！Vue和VueComponent重要内置关系

- ```js
  VueComponent.prototype.__proto__ == Vue.prototype
  ```

  - ```prototype``` 原型对象  #只有函数才有的 显性原型属性
  - ```__proto__```同样原型对象  #只有是对象实例才有的  隐性原型属性

- **正因为有这样一个重要关系,使得组件实例对象vc可以访问Vue原型上的方法和属性**

![image-20210910100353939](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210910100353939.png)

#### 单文件组件

组要构成

- main.js  入口文件  应用App
- index.html   主页面 引入main.js
- App.js   整合所有组件
- 其它.vue 组件  实现各类功能模块

.vue文件案例  School.vue

```vue

<template>
    <div>
        <h2 class="color">我的大学：{{name}}</h2>
        <student></student>
    </div>
</template>

<script>
export default {
    name:"School", //定义别名
    components:{
        Student
    },
    data(){
        return {
            name:'清华大学'
        }
    }
}
</script>

<style>
    .color{
        font-size: 20px;
        color:bisque
    }
</style>
```

### 十九、Vue脚手架

vue-cli(command line interface)

#### 安装vue-cli

配置淘宝镜像

npm config set registry https://registry.npm.taobao.org

1. 安装 ```npm install -g @vue/cli```
2. 切换到要安装文件夹  vue create  vue_test
3. cd vue_test
4. npm run serve
   - ![image-20210910160459520](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210910160459520.png)

5. 访问页面
   - ![image-20210910160606019](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210910160606019.png)

#### 分析脚手架

#### index.html 和 main.js 分析

![image-20210910165714973](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210910165714973.png)

index.html 详解

```html
<head>
    <meta charset="utf-8" />
    <!-- 针对IE游览器的一个特殊配置,含义让IE游览器以最高性能渲染 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- 开启移动端理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <!-- 配置页签图标  BASE_URL == public -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <!-- 找到package.json 的 name -->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- 不支持js时,展现 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
```

main.js解析

```js
// 引入的是残缺版的Vue 没有模板解析器
import Vue from 'vue'
import App from './App.vue'
// 关闭Vue多余的提示
Vue.config.productionTip = false

new Vue({
    el:'#root',
    render: h => h(App)
    // render 用来替代模板解析器 渲染元素
    //全写↓↓
    // render(createElement){
    //     return createElement(App)
    // 也可以这么写return createElement('h2','hello')
    // }
})
```

![image-20210910203602357](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210910203602357.png)

#### 不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
   1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。
3. 为什么vue默认要用残缺版？
   - 减少文件体积
   - 模板解析器不适合在webpack打包好的项目里
     - webpack本来就将文件解析了 .vue->.js 

#### vue.config.js配置

vue.config.js 可以自定义一些配置项 如关闭语法提示、更改入口文件名

- 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。

- 具体参考https://cli.vuejs.org/zh/config/#vue-config-js

#### 脚手架文件结构

```js
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

### 二十、脚手架中的配置项

#### ref属性  (id获取元素)

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
   2. 获取：```this.$refs.xxx```

#### props配置项 （接收数据)

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

   1. 第一种方式（只接收）：```props:['name'] ```

   2. 第二种方式（限制类型）：```props:{name:String}```

   3. 第三种方式（限制类型、限制必要性、指定默认值）：

      ```js
      props:{
      	name:{
      	type:String, //类型
      	required:true, //必要性
      	default:'老王' //默认值
      	}
      }
      ```

   > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

#### mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

   第一步定义混合：

   ```
   a.js
   {
       data(){....},
       methods:{....}
       ....
   }
   ```

   第二步使用混入：

   - main.js全局混入：```Vue.mixin(xxx)```
   - xx.vue局部混入：配置项：```mixins:['xxx']	```

3. 数据冲突：
   - 当出现混合出现冲突时,优先原本数据(除了生命周期钩子)

### 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

   js文件->导出->引入

   ```js
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
   
       // 2. 添加全局指令
       Vue.directive(....)
   
       // 3. 配置全局混入(合)
       Vue.mixin(....)
   
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```

4. 使用插件：```Vue.use()```

#### scoped样式

1. 作用：让样式在局部生效，防止冲突。

2. 写法：```<style scoped>```

   - ```<style lang="less" scoped>```使用less预编译css

3. 安装less

   - npm view less-loader version
- npm i less-loader@7



### 二十一、todoList案例

问题一：

- 兄弟组件怎么传数据？
- 父子组件怎么传数据？
  - 父→子  props
  - 子→父 ?
    - 父给子传递函数 子接受 this指向父 就可以传数据 
  - 父→孙?
    - vuex
    - ...
  
- uid怎么不重复?
  - uuid  精简 nanoid
    - npm i nanoid
    - 使用 import {nanoid }from 'nanoid'   调用nanoid()即可

- 计算属性是在父里计算后给子好,还是传值给子计算好? (计算dones)

细节：

- 尽量不要修改prop传入的值  
  - 如v-model双向数据绑定，即使能简便的实现功能 但违背原则
  
- 对数据的操作应放到含有数据对象的vue文件中



js数组常用操作:

- arr = filter((item,index)=>{return 过滤条件})
- forEach((item,index)=>{})
- splice(start,num,*replaceElem) 
  - num = 0 添加
  - num> 0  删除/删除添加

#### 总结TodoList案例

1. 组件化编码流程：

   ​	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

   ​	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

   ​			1).一个组件在用：放在组件自身即可。

   ​			2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

   ​	(3).实现交互：从绑定事件开始。

2. props适用于：

   ​	(1).父组件 ==> 子组件 通信

   ​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。



### 二十二、游览器本地存储

#### webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

   1. ```xxxxxStorage.setItem('key', 'value');```
      	该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. ```xxxxxStorage.getItem('person');```

      ​		该方法接受一个键名作为参数，返回键名对应的值。

   3. ```xxxxxStorage.removeItem('key');```

      ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. ``` xxxxxStorage.clear()```

      ​		该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. ```JSON.parse(null)```的结果依然是null。

### 二十三、自定义事件

自定义事件 如 click keyup 等内置事件

给VC实例对象绑定自定事件  用$emit('funName')触发事件

给组件绑定自定义事件就算是 原生事件名 也会当成自定义事件

- 如 @click='' 会被当自定义事件需要 $emit()  所以加上修饰符.native化身原生事件

#### 三种子传父：

1. 传统方式  父传函数 子props接受调用

2. 自定义事件  父@getSonMsg=fun1 子触发事件再调用this.$emit('getSonMsg',params)

   - 父子件给子组件绑定事件  子组件发射事件 
     - 给谁绑 谁发射

   - 同样可以对自定义事件使用修饰符

3. 父通过ref获取vc实例对象 父this.$refs.student.$on('getSonMsg',fun1) 

   - 相当于$emit 但更灵活 可以用在钩子函数上
   - fun1可以直接写成匿名函数直接调用 无需再methods定义函数 但需注意this
   - **fun1里的this是 vc  如果要vm则需要使用箭头函数**

#### 自定义事件如何解绑

vc.$off('getSonMsg')  // 单个解绑

vc.$off(['getSonMsg','event'])  //多个解绑

vc.$off()  //解绑所有

vc/vm.$destroy() //只要摧毁vc实例  **自定义**事件消除 原生事件依旧可用

#### 使用自定义事件完善todoList

- 将所有因需要**子传父**的函数 都写为自定义事件而不是属性
- 删除props接受的函数

#### 组件的自定义事件总结

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

   2. 第二种方式，在父组件中：

      ```js
      <Demo ref="demo"/>
      ......
      mounted(){
         this.$refs.xxx.$on('atguigu',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！

### 二十三、事件总线

![image-20210913230037789](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210913230037789.png)

完善todoList   APP.vue  :left_right_arrow: MyItem.vue​ 使用事件总线 进行 孙-父传递数据

- main.js 引入事件总线  

  - ```js
    beforeCreate(){
        Vue.prototype.$bus = this
    }
    ```

- 要接受数据的需要绑定事件 ``` mounted() →this.$bus.$on("NAME",this.fun)``` 且最好备好销毁绑定事件

  - ```js
    mounted() {
        this.$bus.$on("handlerCheck", this.handlerCheck);
        this.$bus.$on("delTodo", this.delTodo);
    },
    beforeDestroy(){
        this.$bus.$off("handlerCheck");
        this.$bus.$off("delTodo");
    }
    ```

- 发送数据``` this.$bus.$emit("NAME",data.)```

- 开发者工具Vue 中   发送数据方 为 <ROOT>



#### 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。



### 二十四、消息订阅与发布（pubsub第三方）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>

   6. 最好用事件总线，本质相同，但事件总线全程由Vue操作

### 二十五、Vue封装的过渡与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

### 二十六、vue脚手架配置代理

#### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

#### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

### 二十七、插槽

**默认插槽** 

总结：父模板标签里的内容 子用```<slot>```标签接收

数据：父有数据并使用数据

**具名插槽**

总结：父模板标签里的内容用```<template slot="center">```进行命名 子用```<slot name="center">```标签接收

数据：父有数据并使用数据

**作用域插槽**

总结：

​	数据在子 父要使用

​	可以在``` <slot :data=“data">```子传递数据
​	父需要```<template slot-scope = "obj"> ```用一个对象"obj"来接受data 使用: obj.data

数据：子有数据 父使用数据

**简写**：解构赋值   ```<template slot-scope = "{data}"> ```直接使用data就可以



#### 总结

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category> //标签内所有内容作为slot的内容
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```

### 二十八、Vuex

#### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

#### 2.何时使用？

​		多个组件需要共享数据时

​		官方说法：

​				1.多个组件依赖于同一状态  （读数据)

​				2.来自不同组件的行为需要变更同一状态 (写数据)

#### 3.Vuex原理

![image-20210919164234094](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210919164234094.png)

Vue允许Vue.Components 直接与 Mutations(加工)传递数据  Devtools只需要和最核心的Mutations交互

vuex方法由store管理Actions Mutations State对象

#### 4.搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

####    5.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

补充：

 当一个Actions 的业务逻辑过复杂 可以context.dispatch("fun2",value) 交给下一个Action来处理,最后context.commit("FUN",value) 提交



#### 5.getters的使用

vuex 中 getters 相当于  vue中的computed  只不过getters服务其他组件:dancers: 而computed只服务于自身组件

**总结**

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```



#### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   //原本：{{ this.$store.state.sum }}
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   //原本{{ this.$store.getters.tensum }}
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //原本
       //addOdd(){
       //	this.$store.dispatch("addOdd", this.num);   
       //}
       
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({addOdd:'addOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['addOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //原来的
       // add() {
       //   this.$store.commit("ADD", this.num);
       // },
       
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({add:'ADD',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

#### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

 ### 二十九、路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

#### 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

#### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

#### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

#### 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

#### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

#### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

#### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

#### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

#### 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

#### 10.缓存路由组件

将组件input类似数据文件储存==>切换时不让组件销毁

1. 作用：让不展示的路由组件**保持**挂载，不被销毁。

2. 具体编码：

   - 缓存一个组件： include = 'xxx'
   - 缓存多个组件： :include=['xx1','xx2']
   - 没有 include 则默认包裹的所有组件

   ```vue
   <keep-alive include="News"> //News是组件名
       <router-view></router-view>
   </keep-alive>
   ```

3. 问题： setTimeout 定时器也被缓存了该如何停止？↓↓ (路由的生命周期钩子)

#### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

#### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
       // document.title = to.meta.title || '标题'
   })
   ```

4. 独享守卫:

   - 在route.js 配置项

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. **组件**内守卫：

   - 组件内使用和钩子一样

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

#### 13.路由器的两种工作模式



1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。

2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。

3. hash模式：

   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。

4. history模式：

   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

    
   
   补充：
   
   - 前端只需要将vue打包成dist文件 给后端使用
   - 前端路由和后端路由
     - 带'#'则可以不用后端调配路由
     - 若用 hitory模式则需要后端调配路由,否则404

### 三十、Vue组件库

![image-20210924123945999](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210924123945999.png)

