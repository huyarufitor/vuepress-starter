var numberToWords = function(num) {
    let gewei = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
    let single = ['','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
    let shiwei = ['','duck','Tweenty','Thirty','Fourty','Fifty','Sixty','Seventy','Eighty','Ninety'];
    let baiwei = ['','Thousand','Million','Billion'];
    let i = 0;
    let result = '';
    function convert(x){
        if(x === 0)
        return '';
        if(x <10 )
        return gewei[x]+' ';
        if(x<20)
        return shiwei[x]+' ';
        if(x<100)
        return shiwei[Math.floor(x/10)]+' '+gewei[x%10]+' ';
        return `${gewei[Math.floor(x / 100)]} hundred ${convert(x % 100)}`.trim();
    }
    while(num>0){
        if(num%1000 !==0){
            result = convert(num%1000) +" "+ baiwei[i] +' '+ result;
        }
        num = Math.floor(num/1000);
        i++;
    }
    console.log('ahkhd:',result)
    return result;

 
};
console.log(numberToWords(1234567890))