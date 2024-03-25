let uid = 0;
export default class Dep {
  constructor() {
    console.log("dep");
    this.id = uid++; // 可以不要  不重要

    this.subs = [];
  }

  // 什么时候 addSub
  addSub(sub) {
    this.subs.push(sub);
  }

  depend() {
    // 当前那个Watcher 被触发了 就会放到 Dep.target 上
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  notify() {
    console.log("notify 通知了");

    const subs = [...this.subs];
    for (let index = 0; index < subs.length; index++) {
      const element = subs[index]; // Watcher
      element.update();
    }
  }
}
