/**
 * 二叉树 
 * 左子树、右子树、根节点
 * 
 */
class TreeNode{
  constructor(data){
    // 节点
    this.data = data
    // 左子节点
    this.left = null
    // 右子节点
    this.right = null
  }
}
// 使用类创建二叉树
funcion createBinaryTree(){
  let root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  //继续添加下一层节点，如果有的话

  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  // console.log('object', root);
  return root;

}
const r = createBinaryTree();
console.log('object',r);