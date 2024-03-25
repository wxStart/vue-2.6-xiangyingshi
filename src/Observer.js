import { def } from "./utils";
import defineReactive from "./defineReactive";

import { arrayMethods } from "./array";

/**
 * 将一个正常object转化为每一层的属性都是响应式的对象
 */
export default class Observer {
  constructor(value) {
    console.log("Observer constructor ", value);
    def(value, "__ob__", this, false);
    if (Array.isArray(value)) {
      // 强行改变  数组的原型为 arrayMethods这个对象
      Object.setPrototypeOf(value, arrayMethods);
      // 让数组的 每一项变成observe
      this.observeArray(value);
    } else {
      this.walK(value);
    }
  }
  walK(value) {
    for (let key in value) {
      defineReactive(value, key);
    }
  }
  observeArray(array) {
    for (let index = 0; index < array.length; index++) {
      observe(array[index]);
    }
  }
}

export function observe(obj) {
  if (typeof obj !== "object") return;

  let ob;
  if (typeof obj.__ob__ !== "undefined") {
    ob = obj.__ob__; // 判断是否是响应式
  } else {
    ob = new Observer(obj);
  }
  return ob;
}
