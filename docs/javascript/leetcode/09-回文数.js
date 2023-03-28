/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0 || (x%10 === 0 && x!==0)){
        //1、负数或者个位数是0的一定不是回文
        return false;
    }
    let revertNum = 0 ;//反转后的数字
    while(x > revertNum)
    {
        revertNum = revertNum * 10 + x % 10;
        x = Math.floor(x/10);
    }
    //奇数最后的结果是 x=12 ; revertNum = 123，要再处理一层
    //偶数的最后结果两个值应该是相等的。
    return x === Math.floor(revertNum / 10) || x === revertNum;
};
// @lc code=end

