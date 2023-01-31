const arr = [
    {
        key: 3,
        value: "1313"
    },
    {
        key: 3,
        value: "11"
    },
    {
        key: 18,
        value: "1000"
    },
]
const result = new Map()

for (let obj of arr) {
    result.set(obj.key, {...obj})
}

const curResult = [...result.values()]
console.log('curResult',curResult);