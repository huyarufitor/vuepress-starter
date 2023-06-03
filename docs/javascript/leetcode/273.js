const numberToWords = function (num) {
    let gewei = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    let single = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    let shiwei = ['', 'Ten', 'Tweenty', 'Thirty', 'Fourty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    let baiwei = ['',  'Thousand', 'Million', 'Billion'];
    let recursion = (curr, num) => {
        //迭代计算每三位一个
        if (num === 0) {
            return;
        } else if (num < 10) {
            curr.push(gewei[num] + ' ')
        } else if (num < 20) {
            // const x = num % 10;
            curr.push(single[num-10] + ' ')
        } else if (num < 100) {
            curr.push(shiwei[Math.floor(num / 10)] + ' ')
            console.log('1212',curr,Math.floor(num / 10))
            recursion(curr, num % 10)
        } else {
            curr.push(gewei[Math.floor(num / 100)] + ' Hundred ')
            recursion(curr, num % 100)
        }
    }
    if(num === 0){
        return 'Zero'
    }
    const sb = [];
    for(let i=3,unit = 1000000000;i>=0;i--,unit = Math.floor(unit / 1000)){
        // 每3位算一次迭代
        const curNum = Math.floor(num/unit) ;
        if(curNum!==0){
            num = num - curNum*unit;//  num 减去最大位
            const curr = [];
            recursion(curr,curNum);
            curr.push(baiwei[i]+" ");
            console.log('curr',curr);
            sb.push(curr.join(''));
        }
    }
   
    return sb.join('').trim();

};

console.log(numberToWords(1234567890))