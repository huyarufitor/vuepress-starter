/**
 * 剑指 Offer 07. 重建二叉树
 * 输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// let preorder = [3,9,20,15,7];//前序：根-左-右
// let inorder = [9,3,15,20,7];//中序：左-根-右
let preorder = [1,2,6,3,4,5];
let inorder = [6,2,1,3,5,4];
 var buildTree = function(preorder, inorder) {
    // 0、先判断传入的俩数组是否为空
    if(preorder.length ===0 && inorder.length ===0)
    return null;
    // 1、找到中序数组【根】的索引值
    let root = inorder.findIndex(item=>item === preorder[0]);
    // console.log('root',root);
    // 2、将当前序列分为【左子序列】和【右子序列】
    let left = inorder.slice(0,root);
    let right = inorder.slice(root+1);
    // console.log('left',left,right);
    // 3、递归输出每个【节点内容】；
    return {
        val:preorder[0],
        left:buildTree(preorder.slice(1,root+1),left),
        right:buildTree(preorder.slice(root+1),right),
    }

};
console.log('buildTree(preorder,inorder)',buildTree(preorder,inorder));
