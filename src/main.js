import { observe } from "./Observer";
import Watcher from "./Watcher";

const obj = {
  a: {
    b: {
      m: 12,
    },
  },
  c: 14,
  d: [1, 2, 3],
};

observe(obj);
console.log("obj: ", obj);
obj.c++;
obj.a.b.m;
obj.d.push(12);
obj.d.push({ key: "122" });
obj.d[4].key = 12;
console.log("obj: ", obj);


// 这里类似组件里面的监听
new Watcher(obj, "a.b.m", function (newVal, oldValue) {
  console.log("a.b.m newVal,oldValue: ", newVal, oldValue);
});
obj.a.b.m++; // 被监听了 才会执行回调
obj.c++; // 没有被监听 就不会执行什么
