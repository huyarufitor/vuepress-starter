/**
 *
以时间复杂度 O(n) 从长度为n的数组中找出同时满足以下两个条件的所有元素：
该元素比放在它左边所有的元素都要大；
该元素比放在它右边所有的元素都要小；
输入：[1, 2, 4, 3, 5, 9]
输出：[1,2,5,9]

解题思路：
由于限制了时间复杂度为O(n)，因此不能用嵌套循环的方法
首先倒序（从右往左）遍历，找到当前 index 右边所有元素中的最小值
然后正序（从左往右）遍历，判断当前元素是否为它左边所有元素的最大值，如果满足条件，最后再跟当前 index 右边的最小值对比，获取符合条件的元素。

作者：Leo奥特曼
链接：https://juejin.cn/post/6941648141049397261
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let nums = [1,2,4,3,5,9]
var res = function(num) {
    // if (num.length < 3) {
    //     return [];
    // }
    const res = [];
 
    const m = new Array(num.length);
    // console.log('m',m);
    let min = num[num.length - 1];
    // 先生成一个新数组，每个位置的值记录它右边(子数组中)最小的值（不包含它本身）
    for(let i = num.length - 1; i > 0; i--) {
        m[i] = min;
        if (num[i] < min) {
            min = num[i];
        }
        m[i - 1] = min;
    };   
    // console.log('min',m);
    let max = num[0];
    for(let i = 0; i < num.length; i++) {
        debugger;
        // 如果当前值是比它前面最大的值还要大
        if (num[i] >= max) {
            max = num[i];
            // 并且比它右边最小的值还要小，则满足条件
            if (num[i] <= m[i]) {
                res.push(max);
            }
        }
    }
    return res;
};
console.log('res',res(nums));