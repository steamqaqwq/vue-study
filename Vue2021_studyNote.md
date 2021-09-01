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
   - ![image-20210831205923165](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210831205923165.png)



## vue Day2

### 一.vue模板 

1. 容器
2. 创建Vue实例
3. 模板替代

istance=实例

{{}} 内部可以使用js表达式

1. js表达式：一个表达式可以生成一个值Date.now()
2. js代码：if for...

![](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901103706221.png)

### 二、Vue指令

​	插值语法,指令语法

​	绑定↓

1. v-bind:href  简写 :href  会变为js表达式  **单向数据绑定**
2. v-model  **双向数据绑定**  得是输入类元素（有value值)可以产生交互才可用
   - 简写 v-model:value="name"  ==>   v-model="name"
3. ![image-20210901105514985](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901105514985.png)

### 三、el和data的两种写法

![image-20210901161705956](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901161705956.png)

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

![image-20210901163752705](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901163752705.png)

![image-20210901164203081](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901164203081.png)

- data中所有属性，vm上都会有
- vm上所有属性 及其 Vue原型上所有属性,在Vue模板都可以直接使用

### 五、Vue中数据代理

- **Object.defineProperty**

vm数据为何需要点击才能显示?

![image-20210901165810361](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901165810361.png)

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

![image-20210901173517397](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901173517397.png)

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



-   vm实例上有![image-20210901204841228](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901204841228.png)

- _data 收集了data中的数据

- 然后用**访问器**获取_data中的数据![image-20210901205048368](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901205048368.png)实现数据代理(通过Object.defineProperty()吧data对象中所有属性添加到vm上)
- #访问器 getter setter

 数据代理的**好处**:更加方便操作data中的数据

 

###  六、事件处理

![image-20210901211223109](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901211223109.png)

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

### 七、事件修饰符

![image-20210901223741534](C:\Users\QAQWQ\AppData\Roaming\Typora\typora-user-images\image-20210901223741534.png)

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