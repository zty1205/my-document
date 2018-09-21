"use strict"

export default utils = {

    /**
     * 二分查找某一item在数组中的位置
     */
    binarySearch: function (array, item, start, end) {
        if(!(array instanceof Array)) {
            throw new Error("The first argument in function must be a instance of Array.")
        }
        var end = (end != null) ? end : array.length-1; // end 可以为0
        var start = start || 0;
        if(start > end){
            return false;
        }
        var m=Math.floor((start + end)/2);
        if(item == array[m]){
            return m;
        }else if(item < array[m]){
            return binarySearch(array, item, start, m-1) //递归调用
        }else{
            return binarySearch(array, item, m+1, end);
        }
    },

    /**
     * 查找满足property = value的对象在数组中的位置
     */
    binarySearchByName: function(array, property, value, start, end){
        if(!(array instanceof Array)) {
            throw new Error("The first argument in function must be a instance of Array.")
        }
        if(!property || typeof property !== "string" ) {
            throw new Error("The second argument in function must be a String.")
        }
        var end = (end != null) ? end : array.length-1; // end 可以为0
        var start = start || 0;
        if(start > end){
            return false;
        }
        var m=Math.floor((start+end)/2);
        if(value == array[m][property]){
            return m + 1;
        }else if(value < array[m][property]){
            return binarySearchByName(array, property, value, start, m-1) //递归调用
        }else{
            return binarySearchByName(array, property, value, m+1, end);
        }
    }
}
