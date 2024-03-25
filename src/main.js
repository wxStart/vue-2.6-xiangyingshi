import { observe } from "./Observer";

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
obj.d[4].key=12
console.log("obj: ",obj );
