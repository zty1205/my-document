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
// ==> 返回按age降序排列的数组s

let array = [1,1,8,9,3,4,"z","z","yy"]
let arr = [
    { id: 11, name: "zty" },
    { id: 11, name: "zty" },
    { id: 11, name: "zty" },
    { id: 12, name: "zty" },
    { id: 13, name: "zty" },
    { id: 13, name: "zty" },
    { id: 14, name: "zty" }  
]

let mixArray = [1,5,"z",{id: 1, name: "2"}, "z", 11]

    function buildKey(item) {
        return item.id
    }


    Array.prototype.hexCount = function(buildKey) {
    let map = {}
    if (buildKey) {
        if (Object.prototype.toString.call(buildKey) !== "[object Function]") {
            throw new Error("The argument must be a function!")
        } else {
            this.forEach(x => {
                let key = buildKey(x)
                map[key] = map[key] || 0;
                map[key]++;
            }) 
        }
    } else {
        this.forEach(x => {
            map[x] = map[x] || 0;
            map[x]++;
        })
    }
    return map
}

    let map = array.hexCount()
    console.log("map = ", map)

    let map2 = arr.hexCount(buildKey)
    console.log("map2 = ", map2)
         
    let map3 = mixArray.hexCount()
    console.log("map3 = ", map3)

    let map4 = mixArray.hexCount(buildKey)
    console.log("map4 = ", map4)

    let a = mixArray.sort()
    console.log("a = ", a)

    let b = array.sort()
    console.log("b = ", b)