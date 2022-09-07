/**
 * 剑指 Offer 64. 求1+2+…+n
 * 求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
 * 乘除法不让用，就是不能直接写Sn = (1+n)*n/2;
 * for不能用，就是不能循环的去加起来；
 * ...
 */
/**
 * @param {number} n
 * @return {number}
 */
n  = 5;
 var sumNums = function(n) {
    n >1 && (n+=sumNums(n-1))>0;
    return n; 
};
console.log('res:',sumNums(n));

// 方法二：
m = 10;
var sum = function(n){
    n && (n+=sum(n-1));
    return n;
}
console.log('sum is:',sum(m));