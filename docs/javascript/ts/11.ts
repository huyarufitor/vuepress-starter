function identity<Type>(argument:Type): Type{
    return argument;
}
let output  = identity<string>("myString");
console.log('output',output);