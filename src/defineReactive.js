import { observe } from "./Observer";
import Dep from "./Dep";

function defineReactive(data, key, val) {
  const dep = new Dep();
  console.log("defineReactive: ", data, key);
  if (arguments.length == 2) {
    val = data[key];
  }
  //! 子元素记性observe  形成了 递归  observe --> Observer--> defineReactive --> observe
  let childOb = observe(val);

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(key + " 的值被访问");

      // 处于依赖收集阶段
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return false;
      }
      console.log(key + " 的值改变了");
      val = newVal;
      // 设置新值的时候也要 observe
      childOb = observe(newVal);
      // 通知更新
      dep.notify();
    },
  });
}

export default defineReactive;
