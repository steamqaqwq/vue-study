# vue-study
Vuejs

## vue Day1

vue： **渐进式**js框架  由浅入深  

vue特点

1. **组件化**,提高复用
2. **声明式**编码,无需操作dom (非命令式js)
3. **虚拟DOM+diff算法**
   - 虚拟创建DOM缓存
   - 用diff算法在缓存基础上增删改查
   - ![image-20210831205923165](https://gitee.com/steamqaqwq/drawingbed/raw/master/markdown/image-20210831205923165.png)



## vue Day2

### 一.vue模板 

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

![image-20210903200704336](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210903200704336.png)

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

![image-20210904112917462](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210904112917462.png)

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

![image-20210904174955771](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210904174955771.png)

错误key值

![image-20210904175126335](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210904175126335.png)

正确key值

![image-20210904175313081](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210904175313081.png)

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

![GIF2021.9.5](C:\Users\QAQWQ\Desktop\GIF2021.9.5.gif)

当觉得一个一个改属性,不如一块改如下时

```js
methods: {
    updateData() {
        this.persons[0] = { id: 1, name: '张三', age: '20', sex: '男' };
    }
},
```

神奇的发现Vue中数据没有改变！但实际vm上的数据已经改变了!可以说是改了但没完全改。

![GIF2021-9-5.2](C:\Users\QAQWQ\Desktop\GIF2021-9-5.2.gif)

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

<img src="C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210905164636844.png" alt="image-20210905164636844" style="zoom: 80%;" />看上去差不多,但和真实实现还是有差距

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



![image-20210905174340916](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210905174340916.png)

<img src="C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210905174307911.png" alt="image-20210905174307911" style="zoom: 80%;" />

<img src="C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210905174409769.png" alt="image-20210905174409769" style="zoom: 80%;" />

  vue数据监测总结

![image-20210905205632687](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210905205632687.png)

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

Vue勾选框 默认查询 checked值 true/false  一般设置value值

- 若是多组勾选框(checkbox)则需要设置初始值为**数组** 字符串则是true/false



![image-20210905234442118](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210905234442118.png)