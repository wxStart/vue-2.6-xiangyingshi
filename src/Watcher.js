import Dep from "./Dep";

let uid = 0;

function parsePath(str) {
  const array = str.split(".");
  return (obj) => {
    for (let index = 0; index < array.length; index++) {
      if (!obj) return;
      const element = array[index];
      obj = obj[element];
    }
    return obj;
  };
}
export default class Watcher {
  constructor(target, expression, cb) {
    console.log("Watcher");
    this.id = uid++; // 可以不要  不重要

    this.target = target;

    this.getter = parsePath(expression); //'a.b.c' 按.拆分

    this.callback = cb;
    // 开始收集么
    this.value = this.get();
    
  }
  update() {
    console.log("数据变化了 通知更新");
    this.run()
  }
  get() {
    // 进入到依赖的收集阶段
    Dep.target = this;
    console.log('开始收集')
    let value;
    // 访问对象

    console.log('开始访问值')
    try {
      value = this.getter(this.target);
    } finally {
      Dep.target = null;
    }

    return value;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value == "object") {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue);
    }
  }
}
