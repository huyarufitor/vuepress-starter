// /**
// *offer 06 从尾到头打印链表
// *输入：head = [1,3,2]
// *输出：[2,3,1]
// **/
// /**
//  * Definition for singly-linked list.
//  * function ListNode(val) {
//  *     this.val = val;
//  *     this.next = null;
//  * }
//  * 先反转链表，再打印
//  */
// /**
//  * @param {ListNode} head
//  * @return {number[]}
//  */
// //  var reversePrint = function(head) {
// //     //非递归
// //     let nowhead = new ListNode(0);
// //     let prev = nowhead;
// //     let nextNode = head;
// //     while(nextNode!==null){
// //         nextNode = nextNode.next;
// //     }

// // };
// function ListNode(val) {
//     this.val = val;
//       this.next = null;
//      }
// var deleteNode = function(head, val) {
//     let origin = head;
//     let node0 = null;
//     let node1 = ListNode();
//     if(head.val !== val){
//         node0 = head;
//         head = head.next;

//     }else{
//         node0.next = node1;
//         node1.next = head.next; 
//     }
//      return head;
// };
// const b = {
//     val:8,
//     next:{
//         val:15,
//         next:{
//             val:1
//         }
//     }
// }
// const res = deleteNode(b,5);
// console.log('deleteNode',res);


// node1.next = head;// 新节点 指向head;
//     let origin = node1;
//     while(origin && origin.next){
//         if(origin.val === val)
//         {
//             origin.next = origin.next.next; // 找到对应值后，断链，指向目标值的后一个
//         }
//         origin = origin.next; //指针往后移   
//     }
//     return node1.next;


//     // 链表中倒数第k个节点
//  /**
//  * @param {ListNode} head
//  * @param {number} k
//  * @return {ListNode}
//  */
// var getKthFromEnd = function(head, k) {
//     let prev = head;
//     let newNode  = new ListNode(-1);
//     while(prev.next!==null){

//     }
//     return head
// };


// var getFirstCommonNode = function(l1,l2){

// }

// var replaceSpace = function(s) {
//     const arr = s.split('');
//     // for(let i=0;i<arr.length;i++){
//     //     if(arr[i]===' '){
//     //         arr[i]='%20';
//     //     }
//     // }
//     // console.log(arr);
//     const b = arr.map(item => {
//         if(item === ' '){
//             item = '%20';
//         }
//         // console.log('item',item);
//         return item;
//     })
//     return b.join('');
// };
// console.log('object',replaceSpace('We are happy.')); 

// var minArray = function(numbers) {
//     // for(let i=0;i<numbers.length;i++){
//     //     if(numbers[i]>numbers[i+1]){
//     //         return numbers[i+1];
//     //     }
//     // }
//     let i=0;
//     while(i<numbers.length){
//         if(numbers[i]>numbers[i+1]){
           
//             return numbers[i+1];
//         }
//         i =i+1;
//     }
//     return numbers[0];
        
// };
// console.log('minArray',minArray([5,6,3])); 

// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

// 示例：

// 输入：nums = [1,2,3,4]
// 输出：[1,3,2,4] 
// 注：[3,1,2,4] 也是正确的答案之一。
/**
//  * @param {number[]} nums
//  * @return {number[]}
//  * [1,2,3,4] => [1,3,2,4]
//  */
//  var exchange = function(nums) {
//     let arr1 =  [];
//     let arr2 = [];
//     let resArr = [];
//     for(let i = 0;i<nums.length;i++){
//         if(nums[i] % 2 === 0){
//             // 偶数
//             arr1.push(nums[i]);
//         }else{
//             arr2.push(nums[i]);
//         }
//     }
//     resArr = arr2.concat(arr1); 
//     return resArr;
    
// };
// console.log('exchange',exchange([1,2,3,4]));

// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
// 请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 示例:

// 现有矩阵 matrix 如下：
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。

// 给定 target = 20，返回 false。
// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// let matrix  = [
//         [ 1, 4, 7, 11, 15 ],
//         [ 2, 5, 8, 12, 19 ],
//         [ 3, 6, 9, 16, 22 ],
//         [ 10, 13, 14, 17, 24 ],
//         [ 18, 21, 23, 26, 30 ]
// ]
//  var findNumberIn2DArray = function(matrix, target) {
//     if(matrix.flat().indexOf(target)>-1){
//         return true;
//     }else{
//         return false;
//     }
// };
// console.log('findNumberIn2DArray(matrix,5);',findNumberIn2DArray(matrix,0));

// 找出数组中重复的数字。


// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 示例 1：

// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[]} nums
 * @return {number}
 */
// let nums  = [2,3,1,0,2,5,3]
//  var findRepeatNumber = function(nums) {
//     // let m = new Set();
//     // for(let i=0;i<nums.length;i++){
//     //     // 如果set里没有,就add,如果有，就返回这个值；到最后都没有，就返回null;
//     //     if(!m.has(nums[i])){
//     //         m.add(nums[i]);
//     //     }else{
//     //         return nums[i];
//     //     }  
//     // }
//     let m  = new Map();
//     for(let i of nums){

//         if(m.has(i)){
//             return i;
//         }
//         m.set(i,1);
//         console.log('m',m);
//     }
//     return null;
    
// };
// console.log('findRepeatNumber(nums)',findRepeatNumber(nums));

// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

// 示例 1：

// 输入：n = 2
// 输出：2
// 示例 2：

// 输入：n = 7
// 输出：21
// 示例 3：

// 输入：n = 0
// 输出：1

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number} n
 * @return {number}
 */
// let n=78
// let sum = 0;
// // 递归---典型的斐波那契数列
//  var numWays = function(n) {
//     // if(n==0 || n==1){
//     //     return 1;
//     // }else if(n==2){
//     //     return 2;
//     // }else{
//     //     return numWays(n-2)+ numWays(n-1);
//     // }
    
//     var n1 = 1, n2 = 2, sum;
//     if(n<=2){
//         return n;
//     }else{
//         for (let i = 2; i < n; i++) {
//             sum = n1 + n2
//             n1 = n2
//             // 为啥是先让num取模，再赋值给n2,不是先n2,再取模。
//             n2 = sum % 1000000007;
//         }
//     }
//     return n2;
// };
// console.log('object',numWays(n)); 

// 青蛙跳台阶问题： f(0)=1f(0)=1 , f(1)=1f(1)=1 , f(2)=2f(2)=2 ；
// 斐波那契数列问题： f(0)=0f(0)=0 , f(1)=1f(1)=1 , f(2)=1f(2)=1 。

// 作者：jyd
// 链接：https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/solution/mian-shi-ti-10-ii-qing-wa-tiao-tai-jie-wen-ti-dong/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
/**
 * F(0) = 0,   F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 * 0 1 1 2 3 5 8
 * @param {number} n
 * @return {number}
 */
//  var fib = function(n) {
//     var n1 = 1, n2 = 1, sum;
//     if(n<=2){
//         return n-1;
//     }else{
//         for (let i = 2; i < n; i++) {
//             sum = n1 + n2
//             n1 = n2
//             // 为啥是先让num取模，再赋值给n2,不是先n2,再取模。
//             n2 = sum % 1000000007;
//         }
//     }
//     return n2;
// };
// console.log('fib',fib(0));

// 有限状态自动机 判断字符串类型的数组---不会



/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// let arr = [0,1,1,1,4,5,3,7,7,8,10,2,7,8,0,5,2,16,12,1,19,15,5,18,2,2,22,15,8,22,17,6,22,6,22,26,32,8,10,11,2,26,9,12,9,7,28,33,20,7,2,17,44,3,52,27,2,23,19,56,56,58,36,31,1,19,19,6,65,49,27,63,29,1,69,47,56,61,40,43,10,71,60,66,42,44,10,12,83,69,73,2,65,93,92,47,35,39,13,75];
// let  k = 75;
// var compare = function (x, y) {//比较函数
//     if (x < y) {
//         return -1;
//     } else if (x > y) {
//         return 1;
//     } else {
//         return 0;
//     }
// }
//  var getLeastNumbers = function(arr, k) {
//     let minKArr = [];
//     for(let i=0;i<k;i++){
//         minKArr.push(arr.sort(compare)[i]);
//     }
//     console.log('minKArr',minKArr);
//     return minKArr;
// };
// getLeastNumbers(arr,k);

// ————————————————
// 版权声明：本文为CSDN博主「idomyway」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/idomyway/article/details/80544509

/**
 * 剑指 Offer 53 - II. 0～n-1中缺失的数字---一直不对，是我没弄懂题目吗？？？
 * @param {number[]} nums
 * @return {number}
 */

//  var missingNumber = function(nums) {
//     for(let i=0;i<nums.length;i++){
//         if(i!==nums[i]){
//             return i;
//         }
//     }
// };
// console.log('object',missingNumber([0,1,3]));
// 判断二叉树是否是对称二叉树。
// const check = (p: TreeNode | null, q: TreeNode | null): boolean => {
//     if (!p && !q) return true;
//     if (!p || !q) return false;
//     return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
// }
// var isSymmetric = function(root: TreeNode | null): boolean {
//     return check(root, root);
// };

// 作者：LeetCode-Solution
// 链接：https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/solution/dui-cheng-de-er-cha-shu-by-leetcode-solu-rgks/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 剑指 Offer 17. 打印从1到最大的n位数---done;
// 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

// 示例 1:

// 输入: n = 1
// 输出: [1,2,3,4,5,6,7,8,9]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number} n
 * @return {number[]}
 */
//  var printNumbers = function(n) {
//     let res = [];
//     for(let i=1;i<Math.pow(10,n);i++){
//         res.push(i);
//     }
//     return res;
// };
// console.log('121',printNumbers(2));

/**
 * 剑指 Offer 15. 二进制中1的个数 ---done
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 汉明重量).）。
 * 
 * 输入：n = 11 (控制台输入 00000000000000000000000000001011)
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/er-jin-zhi-zhong-1de-ge-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
//  var hammingWeight = function(n) {
//     let res = [];
//     let num = 0;
//     // toString(2) 可以直接将10进制转成2进制；
//     // Array.from() 将字符串转数组
//     res = Array.from(n.toString(2));
//     res.forEach(element => {
//         // console.log('element',element);
//         if(element==='1'){
//             num++;
//         }
//     });
//     return num;
// };
// console.log('object',hammingWeight(128));
/**
 * 剑指 Offer 29. 顺时针打印矩阵
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// let matrix = [[1,2,3,0],[4,5,6,10],[7,8,9,19]];
//  var spiralOrder = function(matrix) {
//     if(matrix.length===0){
//         return [];
//     }
//     let t = 0,r = matrix.length-1,l = 0, b = matrix.length-1;
//     console.log('object',t,r,l,b);
//     let resArr = [];
//     while(true){
//         for(let i=l;i<=r;i++){// 从左走到右
//             resArr.push(matrix[t][i]);
//         }
//         if(++t>b) break;// 判断是否到了下边界，到了，就终止循环
//         console.log('t',t);
//         for(let i = t ;i<=b;i++){
//             resArr.push([i][r]);
//         }
//         if(--r<l) break;//是否到了左边界
//         for(let i= r;i>=l;i--){
//             resArr.push([b][i]);
//         }
//         if(--b<t) break;
//         for(let i = b;i>=t;i--){
//             resArr.push([i][l]);
//         }
//         if(++l>r) break;
    
//     }
//     return resArr;
// };
// console.log('spiralOrder',spiralOrder(matrix));

/**
 * 剑指 Offer 61. 扑克牌中的顺子
 * @param {number[]} nums
 * @return {boolean}
 */
let nums = [1,2,12,3,0];
 var isStraight = function(nums) {
    // let sortArr = nums.sort();
    let max = 0;
    let min = 14;
    let repeat = new Set();
    // 先遍历，如果是0就跳过，如果有最小值，就set到setObj对象里去；
    for(num of nums){
        console.log('num',num);
        if(num === 0)
        continue;
        max = Math.max(max,num);
        min = Math.min(min,num);

        if(repeat.has(num)){
            return false;
        }
        repeat.add(num);
    }
    // console.log('max',max);
    // console.log('min',min);
    // 如果最大-最小<5,就是顺子，如果>=5，就不是顺子
    return max-min<5;
};
console.log('object',isStraight(nums)); 