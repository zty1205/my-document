
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
        return array.find((ele) => {
            ele[keyString] == value
        })
    }
}