/**
 * 1598 文件夹操作日志搜集器
 * 每当用户执行变更文件夹操作时，LeetCode 文件系统都会保存一条日志记录。

下面给出对变更操作的说明：

"../" ：移动到当前文件夹的父文件夹。如果已经在主文件夹下，则 继续停留在当前文件夹 。
"./" ：继续停留在当前文件夹。
"x/" ：移动到名为 x 的子文件夹中。题目数据 保证总是存在文件夹 x 。
给你一个字符串列表 logs ，其中 logs[i] 是用户在 ith 步执行的操作。

文件系统启动时位于主文件夹，然后执行 logs 中的操作。

执行完所有变更文件夹操作后，请你找出 返回主文件夹所需的最小步数 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/crawler-log-folder
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

----理解：也就是  多少步能从子目录返回（../）到主目录；
 */

/**
 * @param {string[]} logs
 * @return {number}
 */
 var minOperations = function(logs) {
    let dirArr = [];
    for(let i=0;i<logs.length;i++){
        if(logs[i]==='../'){
            if(dirArr.length!==0)
            {
                dirArr = dirArr.slice(0,dirArr.length-1);
                // console.log('object',dirArr);
            }
        }else if(logs[i]==='./'){
            dirArr = dirArr;
            // console.log('object',dirArr);
        }else{
            dirArr.push(logs[i]);
            // console.log('dirArr',dirArr);
        }
    }
    // console.log('最后',dirArr);
    return dirArr.length;

};
// const log = ["d1/","d2/","./","d3/","../","d31/"];
const log = ["d1/","d2/","../","d21/","./"];
console.log('ds',minOperations(log));


//--- 一次AC：
/**
 * 思路：遇到'../' 深度就-1；遇到'./' 深度不变；遇到其他的，就深度+1；最后输出深度值就可以了；算是个简单题目，不过也做了快半个小时
 */


/**
 * 667 优美的数列||
 * 给你两个整数 n 和 k ，请你构造一个答案列表 answer ，该列表应当包含从 1 到 n 的 n 个不同正整数，并同时满足下述条件：

假设该列表是 answer = [a1, a2, a3, ... , an] ，那么列表 [|a1 - a2|, |a2 - a3|, |a3 - a4|, ... , |an-1 - an|] 中应该有且仅有 k 个不同整数。
返回列表 answer 。如果存在多种答案，只需返回其中 任意一种 。

输入：n = 3, k = 1
输出：[1, 2, 3]
解释：[1, 2, 3] 包含 3 个范围在 1-3 的不同整数，并且 [1, 1] 中有且仅有 1 个不同整数：1

输入：n = 3, k = 2
输出：[1, 3, 2]
解释：[1, 3, 2] 包含 3 个范围在 1-3 的不同整数，并且 [2, 1] 中有且仅有 2 个不同整数：1 和 2

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/beautiful-arrangement-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


也就是： 输出一个前后两个数绝对值，的种类只有k种的n个数的数组；如何将n打散很重要；

不懂。-----这个还不懂
 */