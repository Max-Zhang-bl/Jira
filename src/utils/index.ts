import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value); //第二个!相当于Boolean()

//在一个函数里，不要改变原本对象本身
export const cleanObject = (object: object) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //如果value是为0的情况需要排除/ !value的可取值是null、undefined、0、“”，false。示例
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//   ...5s
// 执行！
//
// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只剩timeout#3在独自等待了

//什么时候用custom Hook，里面需要用到hook的时候，其他时候用fn
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  console.log("debouncedValue", debouncedValue);
  return debouncedValue;
};
