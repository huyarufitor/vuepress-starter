/**
 * 和剑指offer 14-1 题基本一致
 * 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段
 * （m、n都是整数，n>1并且m>1），
 * 每段绳子的长度记为 k[0],k[1]...k[m-1] 。
 * 请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？
 * 例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。 
 * 贪心算法 --- 当n>4后，尽可能的使用 3和2 去分解，这是数学思想
 */
let n = 10
var integerBreak = function(n) {
    if(n===2){
        return 1;
    }
    if(n===3){
        return 2;
    }
    let res = 1;
    while(n>4){
        res = res*3;
        n = n-3;
    }
    return res * n
};
console.log(integerBreak(n));