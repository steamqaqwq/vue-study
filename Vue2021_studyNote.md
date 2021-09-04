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

### 九、class样式动态绑定

1. 字符串写法,适用于：样式的类名不确定,需要动态绑定
2. 数组写法，适用于：要绑定的样式个数不确定、名字也不确定
3. 对象写法，适用于：要绑定的样式个数确定、名字也确定，但需要根据实际判断启用



