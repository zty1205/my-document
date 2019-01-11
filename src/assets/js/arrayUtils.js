
const arrayUtils = {
    /**
     * 
     * @param {*} list == List<Object>
     * @param {*} keyString 
     * @param {*} valueString 
     */
    buildMap: (list = [], keyString = "id", valueString) => {
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
    binarySearchItem: (array = [], keyString = "id", value = 1, start = 0, end) => {
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

    findItem: (array = [], keyString = "id", value) => {
        return array.find((ele) => {
            ele[keyString] == value
        })
    },

    hexDuplicate: (arr, key) => {
        let set = new Set()
        return arr.filter((a) => !set.has(a[key]) && set.add(a[key]))
    },

    hexCount: (buildKey) => {
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
                map[x] = map[key] || 0;
                map[x]++;
            })
        }
        return map
    }


}