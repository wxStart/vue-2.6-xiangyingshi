import { def } from "./utils";
/**
 * 改写数组的7个方法
 */
const methods = [
  `push`,
  `pop`,
  `shift`,
  `unshift`,
  `splice`,
  `sort`,
  `reverse`,
];

const arrayPrototype = Array.prototype;

export const arrayMethods = Object.create(arrayPrototype);

methods.forEach((methodName) => {
  const original = arrayMethods[methodName];
  def(
    arrayMethods,
    methodName,
    function (...argu) {
      console.log("数组改写的方法被执行了");

      /**
       * 把数组身上的__ob__ 取出来，__ob__ 肯定存在了，因为数组肯定不是最层，
       * 比如是obj.d属性是个数组，第一次便利这个对象的d属性的时候，就已经个d（数组）
       * 添加了__ob__属性
       */
      const ob = this.__ob__;

      // 数组中有三个方法会改变 插入新项  现在要把新插入的项也变成为 observe的

      let inserted = [];
      switch (methodName) {
        case "push":
        case "unshift":
          inserted = argu;
          break;
        case "splice":
          // 下标为2 之后才是新增的项目
          // splice(下标，删除个数,后面才是新增的数据)
          inserted = argu.slice(2);
          break;
      }
      if (inserted.length) {
        // Observer.observeArray
        ob.observeArray(inserted);
      }
      // 也要通知
      ob.dep.notify();

      return original.apply(this, argu);
    },
    false
  );
});
