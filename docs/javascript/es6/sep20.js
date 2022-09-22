/** 状态压缩 动态规划 // 把所有位置访问过置为true,没访问过置为false。-----属实不会
 * 698. 划分为k个相等的子集  Medium
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
 * 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
输出： True
说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。

输入: nums = [1,2,3,4], k = 3
输出: false

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/partition-to-k-equal-sum-subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const nums = [4,3,2,3,5,2,1];
const k = 4;
 var canPartitionKSubsets = function(nums, k) {
    //（1）如果和不是k的整数倍，那直接返回false;
  
    let all=0;
    for(let i=0;i<nums.length;i++){
        all+=nums[i];
    }
    if(all%k!==0){
        return false;
    }
    //(2)记录每个集合的和是per，把原始数组，升序排列
    let per = all/k;
    nums.sort((a,b)=>a-b);
    console.log('nums',nums);
    const n= nums.length;
    if(nums[n-1]>per){
        //(3)如果一个最大的值都大于集合和per，返回false
        return false;
    }
    const dp = new Array(1 << n).fill(false);
    const curSum = new Array(1 << n).fill(0);
    dp[0] = true;
    for (let i = 0; i < 1 << n; i++) {
        if (!dp[i]) {
            continue;
        }
        for (let j = 0; j < n; j++) {
            if (curSum[i] + nums[j] > per) {
                break;
            }
            if (((i >> j) & 1) == 0) {
                let next = i | (1 << j);
                if (!dp[next]) {
                    curSum[next] = (curSum[i] + nums[j]) % per;
                    dp[next] = true;
                }
            }
        }
    }
    return dp[(1 << n) - 1];
};
console.log('结果：',canPartitionKSubsets(nums,k));