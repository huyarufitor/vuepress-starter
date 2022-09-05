/**
 * 汇总：
 * （1）剑指 Offer 53 - II. 0～n-1中缺失的数字
 * confused: 输入【0，1】后，输出是2；
 */

/**
 * 剑指 Offer 57. 和为s的两个数字
 * 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[2,7] 或者 [7,2]
 * /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// let nums = [2,7,11,15];
// var twoSum = function(nums, target) {
//     let p = 0;
//     let q = nums.length-1;
//     let res = [];
//     let sum = 0;
//     while(p<q){
//         sum = nums[p]+nums[q];
//         // p++;
//         // q--;
//         console.log('合：',sum);
//         // if(sum>target){
//         //     q-=1;
//         //     console.log('1',p,q);
//         // }else if(sum<target){
//         //     p+=1;
//         //     console.log('2',p,q);

//         // }else{
//         //     // res.push[nums[q]];
//         //     // res.push[nums[p]];
//         //     // console.log('dadada');
//         //           console.log('3',p,q);
//         // }
//     }
//     return res;
// };
// console.log('twoSum',twoSum(nums,9));


/**
 * leetcode 202. 快乐数
 * 编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/happy-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

输入：n = 19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1


输入：n = 2
输出：false

n的取值范围： 1 <= n <= 2^31 - 1
*/

/**
 * @param {number} n
 * @return {boolean}
 */

//  var isHappy = function(n) {
//     let sum = 0;
//     if(n<10){
//         return false;
//     }else{
//         for(let i = 0;)
//     }
// };