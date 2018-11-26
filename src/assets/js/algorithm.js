/**
 * 1. 快速排序算法
 * 平均复杂度 O(nlogn) 最差 O(n^2) 不稳定的排序算法
 * 概述：取一个基准， 将比基准值小的放在他的前面，大的值放在后面。 在对两边分别做快速排序，直到递归结束
 * 思想：分治法
 * 优化：(1) 三平均分区法 - 选用待排数组最左边、最右边和最中间的三个元素的中间值作为中轴 减少最坏情况的概率， 不需要哨兵
 *      (2) 在分区过小时使用其他高效的排序算法； 优先递归排序分区小的
 *      (3) 三分区: 小的在左边 相等的在中间 大的在右边
 */

 const quickSort = function(arr = []) {
    if (arr.length <= 1) {//如果数组长度小于等于1无需判断直接返回即可 
        return arr;
    }
　　let pivot_Index = Math.floor(arr.length / 2);//取基准点 
　　let pivot = arr.splice(pivot_Index, 1)[0];//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数
　　let left = [];//存放比基准点小的数组
　　let right = [];//存放比基准点大的数组 
　　for (let i = 0; i < arr.length; i++){ //遍历数组，进行判断分配 
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);//比基准点小的放在左边数组 
　　　　} else {
　　　　　　right.push(arr[i]);//比基准点大的放在右边数组 
　　　　}
　　}
    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1； 
　　return quickSort(left).concat([pivot], quickSort(right));
 }

