import { observe } from "./Observer";

function defineReactive(data, key, val) {
  console.log('defineReactive: ',data, key);
  if (arguments.length == 2) {
    val = data[key];
  }
  //! 子元素记性observe  形成了 递归  observe --> Observer--> defineReactive --> observe 
  observe(val);

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(key + " 的值被访问");
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return false;
      }
      console.log(key + " 的值改变了");
      val = newVal;
    },
  });
}

export default defineReactive;
