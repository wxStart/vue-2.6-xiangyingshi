## Vue2.6 源码学习

### 对象的响应式处理
1. `observe(object)` 一个对象时候，会对这个对象进行 ` new Observer(object)`,在Observer中的时候 会进行 `defineReactive(object, key)`劫持操作，在这里的时候又会对`object[key]`的值进行`observe(object[key])`,从而形成了递归的处理。

### 数组的响应式处理