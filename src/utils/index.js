export const isFalsy = (value) => (value === 0 ? false : !value); //第二个!相当于Boolean()

//在一个函数里，不要改变原本对象本身
export const cleanObject = (object) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      //如果value是为0的情况需要排除/ !value的可取值是null、undefined、0、“”，false。示例
      delete result[key];
    }
  });
  return result;
};
