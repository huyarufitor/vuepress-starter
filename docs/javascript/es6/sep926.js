// const new = [
//     {
//         prop:'clue',
//         width:'60',
        
//     },
//     {
//         prop:'valid'
//         width:'100',
//     }
// ];
const add = [
    {
        age:18,
        name:'11',
    },
    {
        age:10,
        name:'10'
    }
];
const add2 = [
    {
        age:0,
        name:'11',
    },
    {
        age:10,
        name:'10'
    }
];
// const old = [
//     {
//         prop:'clue',
//         width:'100',
//         selectCallback:selectCallback,
//     },
//     {
//         prop:'valid'
//         width:'100',
//         selectCallback:selectCallback,
//     }
// ];

const a = add2.map(item => {
   const b =  add.find(i => i.name===item.name)
   return {
    ...item,
    ...b
   }
console.log('item',item);
return item;
})
console.log('a',a);