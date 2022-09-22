/**reduce用法（1） 计算数组中每个元素出现次数 */
// let names = ['Alice','Bob','Tiff','Bruce','Alice'];

// let nameNum = names.reduce((pre,cur)=>{
//     if(cur in pre){
//         // console.log('cur',pre,cur);
//         pre[cur]++
//     }else{
//         pre[cur] = 1
//     }
//     return pre
// },{})
// console.log('na,e:',nameNum, nameNum instanceof Object);
/**
 * （2）数组去重
 */
let arr = ['121','121','2'];
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
        return pre.concat(cur)
    }else{
        return pre
    }
},[])
console.log('newArr',newArr);
function unique(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
console.log('unique(arr)',unique(arr));