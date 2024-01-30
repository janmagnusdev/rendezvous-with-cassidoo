import { Node, printTree } from "./trees";

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

let treeRepresentation = `
    1
   / \\
  2   3
 / \\
4   5
`;

describe("printTree", () => {
  it("should print correct tree from examples", () => {
    expect(printTree(root)).toEqual(treeRepresentation);
  });
});
