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