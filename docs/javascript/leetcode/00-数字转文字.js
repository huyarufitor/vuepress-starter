/**
 * input
 * @param {number} n 数字
 * output
 * @param {string} str 字符串
 * 
 function numberToChinese(num) {
  const units = ['', '十', '百', '千', '万'];
  const nums = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let result = '';
  let i = 0;
  while (num > 0) {
    const digit = num % 10;
    if (digit !== 0) {
      result = nums[digit] + units[i] + result;
    } else if (result[0] !== nums[0]) {
      result = nums[0] + result;
    }
    num = Math.floor(num / 10);
    i++;
  }
  return result;
}
 */
function numToWord(n){
    const units = ['','十','百','千','万'];
    const nums  = ['','一','二','三','四','五','六','七','八','九'];
    let resultStr = '';
    let i = 0;
    while(n>0){
       const digit = n%10;
       if(digit!==0){
        resultStr = nums[digit] + units[i] +resultStr
       }
       n = Math.floor(n/10);
       i++;
    }
    return resultStr;
}
console.log(numToWord(12340));