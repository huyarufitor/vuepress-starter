console.log(1);
setTimeout(() => {
    //宏
  console.log(2);
  process.nextTick(() => {
    //微
    console.log(3);
  });
  new Promise((resolve) => {
    //宏
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
    //微
  });
});











new Promise((resolve) => {
  console.log(7);
  //宏
  resolve();
}).then(() => {
  console.log(8);
  //微
});
process.nextTick(() => {
  console.log(6);
  //微
});
setTimeout(() => {
    //宏
  console.log(9);
  process.nextTick(() => {
    console.log(10);
    //微
  });
  new Promise((resolve) => {
    console.log(11);
    //宏
    resolve();
  }).then(() => {
    console.log(12);
    //微
  });
});



//node <11:1 7 6 8 2 4 9 11 3 10 5 12
//node>=11:1 7 6 8 2 4 3 5 9 11 10 12

