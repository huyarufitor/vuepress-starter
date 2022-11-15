/**
 * 剑指 Offer 62. 圆圈中最后剩下的数字
 * 0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。
 * 求出这个圆圈里剩下的最后一个数字。
 * 例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。
 */
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
let n =10;
let m = 17;
var lastRemaining = function(n, m) {
    let a =[];
    for(let i=0;i<n;i++){
        // 先把n个数放入数组中
        a.push(i);
    }
    let p = 0;
    while(a.length!==1){
        // 数组长度不为1的时候循环执行
        p = (p+m-1)%n; //找到要删除的元素 索引值index
        a.splice(p,1); //删除数组中的索引值为p的值
        n--; //数组长度 n--
    }
    return a;
};
const result = lastRemaining(n,m);
console.log('result',result);
//时间复杂度  6n+3=====> O(n)

// 事实证明-----我自己写的这个会超出时间限制；

// 这个是大佬的解法---
var lastRemaining = function(n,m)
{
    let pos = 0;  
    for (let i = 2; i <= n; i++) {
        // 每次循环右移
        pos = (pos + m) % i;
    }

    return pos;
    // 接法图片详情见：./leetcode offer 62-solution-pic.png
}