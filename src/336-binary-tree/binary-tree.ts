import { maxHeaderSize } from "http";

class MyNode {
  public left?: MyNode;
  public right?: MyNode;
  public value: NonNullable<any>;

  constructor(value: NonNullable<any>) {
    this.value = value;
  }
}

function maxDepth(tree?: MyNode): number {
  if (tree === undefined) {
    return 0;
  }
  return 1 + Math.max(maxDepth(tree.left), maxDepth(tree.right));
}

function printTree(tree: MyNode) {
  const maxDep = maxDepth(tree);
  // TODO: Print left nodes only
  console.log(maxDepth(tree));
}

/*
> printTree(root)
> "
    1
   / \
  2   3
 / \
4   5
"
*/

let root = new MyNode(1);
root.left = new MyNode(2);
root.right = new MyNode(3);
root.left.left = new MyNode(4);
root.left.right = new MyNode(5);

printTree(root);
