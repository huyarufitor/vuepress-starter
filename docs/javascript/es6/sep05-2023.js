/** forEach 不能跳出循环，除非throw 一个error */
Array.prototype.customeEach = function (callback) {
    for(let i =0;i<this.length;i++){
        // console.log('this',this);
        callback(this[i],i,this)
    }
}
let arr = ['12',2,3,4,5]
arr.customeEach((item,index,arr)=>{
    // console.log(item,index,arr)
})
try {
    arr.forEach((item,index,arr)=>{
        if(index===1){
            console.log('index=',index);
            throw new Error('停止foreach')
        }
        console.log('item=',item);

    })
}catch(e){
    console.log('这里抛出错误',e);
}