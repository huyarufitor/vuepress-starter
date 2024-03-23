# 关于ts和js想到的一些些思考，来自于图书馆被雅思折磨疯的我

## 静态类型

指的是在编译阶段就要确定变量的数据类型。
常见的静态类型编程语言有：Java/c++/C#/TypeScript/Go

而前端常用的js，不是静态类型语言，不需要提前确认变量类型，只有用ts后才编程静态类型语言。

## 为什么js中有原型，ts没有

js没有接口继承方法，js中的原型链作用是允许对象通过原型链来继承属性和方法。
在ts中，虽然不像js利用原型处理对象的继承，但ts中可以用 <接口>和<类>实现面向对象编程。

## ts中的类和接口的区别是什么

接口（interface）是用于定义对象的结构，就是一个对象有什么样类型的属性，有什么类型方法；
类（class）是创建具有相似属性和方法的对象实例；

```js
//接口
interface Person {
    name: string;
    age: number;
    sayHello:()=>void
}
//类

class Student inplements Person {
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    sayHello(){
        console.log(`this student's name is ${this.name},and whose age is ${this.age}`)
    }
}

let takawang = new Student("wang",18)
takawang.sayHello()
```

## ts中的枚举 作用和用法

由于前期js中没有枚举这个类型，在对js做增强的时候，ts中增加了枚举类型。
枚举类型不一定都是数字，可以是数字、字符串、计算类型；

```js
enum Direction {
    top = 1,
    down,
    left,
    right,
}
let myDirection:Direction = Direction.top;
console.log('myDirection is :',myDirection);
```

## ts中的泛型编程

所谓泛型编程，其实就是generic programming，generic：通用的；
就是将一些通用的方法抽象出来，使其适用于不同类型的数据，提高代码的复用性和灵活性；

好处：
 利用泛型编程，可以将特定类型的代码逻辑与数据类型解藕，使得代码更加通用，可复用，灵活。

## ts中的命名空间Namespace

通过NameSpace ，可以将函数、接口、类等相关代码组合在一起，避免全局命名冲突，提高了代码的可维护性和可读性。

例子：

```js
//定义一个命名空间
namespace MyNameSpace {
    //接口
    export interface Person {
        name:string;
        age:number;
    }
    //函数
    export function sayHi(person:Person){
        console.log(person.age,person.name)
    }
}
// 实例化对象
let person: MyNameSpace.Person = {
    name :'maka',
    age:13,
}
MyNameSpace.sayHi(person)
```

## 元组（Tuple）

定义包含多个不同类型的数组
