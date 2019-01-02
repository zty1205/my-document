/*
    Array.prototype.sort(compare: function) 
    1. 数组排序 返回排好序的原数组
    2. compare 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
 */

 let array = [1,7,656,4,564,765,26,89,43]
 let array1 = [1,7,656,4,564,765,26,89,43]
 let array2 = [1,7,656,4,564,765,26,89,43]

 console.log("sort() array = ", array.sort())
 // ==> [1, 26, 4, 43, 564, 656, 7, 765, 89] 按Unicode位点进行排序

 console.log("sort() array = ", array1.sort((a,b) => {return a - b} ))
// ==> [1, 4, 7, 26, 43, 89, 564, 656, 765] 升序

 console.log("sort() array = ", array2.sort((a,b) => {return a - b} ))
 // ==> [765, 656, 564, 89, 43, 26, 7, 4, 1] 降序

 let arr = [
    { id: 1, age: 1 },
    { id: 2, age: 7 },
    { id: 3, age: 656 },
    { id: 4, age: 4 },
    { id: 5, age: 564 },
    { id: 6, age: 765 },
    { id: 7, age: 26 },
    { id: 8, age: 89 },
    { id: 9, age: 43 }
]
let arr1 = [...arr]
let arr2 = [...arr]

console.log("sort() array = ", arr.sort())
// ==> 无法排序 返回原数组

console.log("sort() array = ", arr1.sort((a,b) => {return a.age - b.age} ))
// ==> 返回按age升序排列的数组

console.log("sort() array = ", arr2.sort((a,b) => {return b.age - a.age} ))
// ==> 返回按age降序排列的数组

const arrayUtils = {
    /**
     * 
     * @param {*} list == List<Object>
     * @param {*} keyString 
     * @param {*} valueString 
     */
    buildMap: function(list = [], keyString = "id", valueString) {
        if ((typeof keyString) != "string") {
            throw new Error("The second argument in function must a string")
        }
        if (valueString && (typeof valueString) != "string") {
            throw new Error("The third argument in function must a string")
        }
        let map = {}
        if (valueString) {
            list.map(x => {
                map[x[keyString]] == x[valueString] || ""
            })
        } else {
            list.map(x => {
                map[x[keyString]] == x
            })
        }
        return map
    },

    /**
     * 
     * @param {*} list == List<Object> && sort by Object[keyString] in ASC
     * @param {*} keyString 
     * @param {*} value 
     * @param {*} start 
     * @param {*} end 
     */
    binarySearchItem: function(list = [], keyString = "id", value = 1, start = 0, end) {
        let _end = (end != null) ? end : array.length-1; // end 可以为0
        if(start > _end){
            return false;
        }
        let m = Math.floor((start + _end) / 2);
        if(value == array[m][keyString]){
            return m + 1;
        }else if(value < array[m][keyString]){
            return searchItem(array, keyString, value, start, m-1) //递归调用
        }else{
            return searchItem(array, keyString, value, m+1, _end);
        }
    },

    findItem: function(array = [], keyString = "id", value) {
        return array.findIndex((ele) => {
            ele[keyString] == value
        })
    }
}