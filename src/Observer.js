import { def } from "./utils";
import defineReactive from "./defineReactive";

/**
 * 将一个正常object转化为每一层的属性都是响应式的对象
 */
export default class Observer {
  constructor(value) {
    console.log("Observer constructor ", value);
    def(value, "__ob__", this, false);
    this.walK(value);
  }
  walK(value) {
    for (let key in value) {
      defineReactive(value, key);
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
