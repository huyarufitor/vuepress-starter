var numberToWords = function(num) {
    let gewei = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
    let single = ['Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
    let shiwei = ['','Ten','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
    let baiwei = ['','Thousand','Million','Billion'];
    let i = 0;
    let result = '';
    function convert(x){
        if(x === 0)
        return '';
        if(x <10)
        return gewei[x];
        if(x<20)
        return single[x-10];
        if(x<100)
        return shiwei[Math.floor(x/10)]+' '+gewei[x%10];
        return `${gewei[Math.floor(x / 100)]} Hundred ${convert(x % 100)}`;
    }
    if(num===0){
        return 'Zero';
    }
    while(num>0){
        if(num%1000 !==0){
            result = convert(num%1000) +' '+ baiwei[i] +' '+ result;
            console.log('result',result)
        }
        num = Math.floor(num/1000);
        i++;
    }
    return result.trim();

 
};
console.log(numberToWords(50868))