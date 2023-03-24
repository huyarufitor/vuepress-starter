import { allProList } from "./index.js";
// const fs = require('fs'); esmodule
import fs from "fs";
function getRandomInt(length) {
  return Math.floor(Math.random() * length);
}

// 示例：从0到9选一个随机整数
var randomInt = getRandomInt(allProList.length);
console.log("随机题目数", randomInt-1 + "-" + allProList[randomInt-1].title); // 输出0到9之间的一个整数
const generateQANum = () => {
  allProList.forEach((item) => {
    if (item.index === randomInt-1) {
      item.marked++;
    }
  });
  fs.writeFile(
    "./result.js",
    "let resultQAs = " + JSON.stringify(allProList),
    (err) => {
      if (!err) console.log("success!");
    }
  );
};
generateQANum();
