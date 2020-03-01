"use strict";

const utils = {
  /**
   * 数据深拷贝
   * 1. JSON.stringify(JSON.parse(array))
   * 2. [...array]
   */
  deepClone: function(obj, hash = new WeakMap()) {
    // 递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== "object") return obj; // 简单类型
    if (hash.has(obj)) return hash.get(obj); // 循环引用
    let instance = new obj.constructor();
    hash.set(obj, instance);
    for (let key in instance) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        this.deepClone(obj[key], hash);
      }
    }
  },

  /**
   * 对象深拷贝
   * 1. JSON.stringify(JSON.parse(obj))
   * 2. {...obj}
   * 3. Object.assign({}, target)
   */

  /**
   * 二分查找某一item在数组中的位置
   */
  binarySearch: function(array, item, start, end) {
    if (!(array instanceof Array)) {
      throw new Error(
        "The first argument in function must be a instance of Array."
      );
    }
    let _end = end != null ? end : array.length - 1; // end 可以为0
    let _start = start || 0;
    if (_start > _end) {
      return false;
    }
    let m = Math.floor((_start + _end) / 2);
    if (item == array[m]) {
      return m;
    } else if (item < array[m]) {
      return binarySearch(array, item, _start, m - 1); //递归调用
    } else {
      return binarySearch(array, item, m + 1, _end);
    }
  },

  /**
   * 查找满足property = value的对象在数组中的位置
   */
  binarySearchByName: function(array, property, value, start, end) {
    if (!(array instanceof Array)) {
      throw new Error(
        "The first argument in function must be a instance of Array."
      );
    }
    if (!property || typeof property !== "string") {
      throw new Error("The second argument in function must be a String.");
    }
    let _end = end != null ? end : array.length - 1; // end 可以为0
    let _start = start || 0;
    if (_start > _end) {
      return false;
    }
    let m = Math.floor((_start + _end) / 2);
    if (value == array[m][property]) {
      return m + 1;
    } else if (value < array[m][property]) {
      return binarySearchByName(array, property, value, _start, m - 1); //递归调用
    } else {
      return binarySearchByName(array, property, value, m + 1, _end);
    }
  },

  /**
   * 将一个数组构建成数组表示的树
   * id: String 唯一标识该元素的id
   * parent: String 指向父元素的id
   */
  buildChildrenTree: function(arr, id, parent) {
    let array = [...arr];
    for (let i = array.length - 1; i >= 0; i--) {
      let node = array[i];
      if (node[parent]) {
        for (let j = 0, len_j = array.length; j < len_j; j++) {
          if (node[parent] == array[j][id]) {
            let child = Object.assign({}, node);
            if (array[j] && array[j].children && array[j].children.length > 0) {
              array[j].children.push(child);
            } else {
              array[j].children = [];
              array[j].children.push(child);
            }

            node.del = true;
            break;
          }
        }
      }
    }

    for (let i = 0, len = array.length; i < len; i++) {
      if (array[i] && array[i].del) {
        if (array[i].length > 0) {
          delete array[i].del;
        } else {
          array.splice(i, 1);
          len--;
          i--;
        }
      }
    }

    return arr;
  },

  /**
   * 由一个数组生成一个指向父元素或父元素属性的map
   * id: String 唯一标识该元素的id
   * parent: String 指向父元素的id
   * property: String map 的 value值是父元素的那个属性，可以为空，此时返回整个父元素
   */
  buildParentMap: function(arr, id, p, property) {
    let map = {};
    let array = arr || [];
    let _id = id || "id";
    let parent = p || "parent";
    if (property) {
      for (let i = array.length - 1; i >= 0; i--) {
        let node = array[i];
        if (node[parent]) {
          for (let j = 0, len_j = array.length; j < len_j; j++) {
            if (node[parent] == array[j][_id]) {
              map[node[_id]] = array[j][property];
            }
          }
        }
      }
    } else {
      for (let i = array.length - 1; i >= 0; i--) {
        let node = array[i];
        if (node[parent]) {
          for (let j = 0, len_j = array.length; j < len_j; j++) {
            if (node[parent] == array[j][_id]) {
              map[node[_id]] = array[j];
            }
          }
        }
      }
    }

    return map;
  }
};

export default utils;
