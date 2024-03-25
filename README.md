## Vue2.6 源码学习

### 对象的响应式处理

1. `observe(object)` 一个对象时候，会对这个对象进行 ` new Observer(object)`,在 Observer 中的时候 会进行 `defineReactive(object, key)`劫持操作，在这里的时候又会对`object[key]`的值进行`observe(object[key])`,从而形成了递归的处理。

### 数组的响应式处理

1. vue 中重写了数组的 `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`
2. 重新定义数组对象的原型为我们改写的原型对象
3. 对数组的每一项进行 observe 处理
4. 针对数组的新增项 需要 observe 处理

### Dep 类 和 Watcher 类

Dep：把依赖收集代码封装成一个类，它专门用来管理依赖，每一个 Observer 的实例，成员中都有一个 Dep 的实例

Watcher:是一个中介，数据发生变化通过 Watcher 中转，通知组件   

下方是流程：    
- 创建 observe 的时候 Dep.target 为空 false，同时给对象创建了dep实例，再次访问属性的时候会判断是否需要收集依赖    
- 当数据更新的时候，调用 dep.notify();
- dep.notify() 调用时候回调用 watcher 的 update（在 update 中调用监听时候的回调）
- 当注册监听的时候 会访问一次这个值，然后会执行的 observe 对象的 get 属性（defineReactive 方法中收集了依赖）， 然后执行了 dep.appded（此时 Dep.target 就是当前的 watcher 实例）
