import { observe } from "./Observer";

const obj = {
  a: {
    b: {
      m: 12,
    },
  },
  c: 14,
};

observe(obj)
console.log('obj: ', obj);
obj.c++
obj.a.b.m
