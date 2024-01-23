/**
 * 数字转中文表达，比如：12345 输出一万两千三百四十五
 * 算法分析：
 * （1）用递归方法，将亿以上、万-亿、万以下分为三个部分，分别递归输出
 * （2）处理字符串的时候，有 一十、一百零一 要转成 十、一百零一
 * （3）最后的字符串如果是零的话，也要去掉-----
 */

function arabicToChinese(num){
  const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unitNames = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
}

// 面经推荐方法
// https://fe.ecool.fun/topic/903ad6ce-2c81-4d82-a356-536e4629cfa3?orderBy=updateTime&order=desc&tagId=26
function NumToChina(n) {
  n = n.toString();
  let numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (n === '0') return numbers[0];
  let units = ['', '十', '百', '千'];
  let len = n.length;
  let res = '';
  for (let i = 0; i < len; i++) {
    let num = Number(n[i]);
    if (num != 0) {
      if (n[i - 1] === '0') res = res + numbers[0];
      res = res + numbers[num] + units[len - i - 1];
    }
  }
  if (len == 2 && n[0] == '1') res = res.slice(1);
  return res;
}

function numTo(n) {
  const isLose = n < 0;
  n = Math.abs(n).toString();
  let res = [];
  let len = n.length;
  for (let i = len; i > 0; i -= 4) {
    res.push(NumToChina(n.slice(Math.max(0, i - 4), i)));
  }
  const units = ['', '万', '亿','兆'];
  for (let i = 0; i < res.length; i++) {
    if (res[i] == '') continue;
    res[i] = res[i] + units[i];
  }
  isLose && res.push('负');
  return res.reverse().join('');
}
console.log('sa:',numTo(15321211234502));