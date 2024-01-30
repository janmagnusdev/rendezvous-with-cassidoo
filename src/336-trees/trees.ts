/*
Write a data structure for a simple binary tree, and a function that prints a given tree.
Example:
let root = new Node(1);
    root.left = new Node(2);
    root.right = new Node(3);
    root.left.left = new Node(4);
    root.left.right = new Node(5);

> printTree(root)
> "
    1
   / \
  2   3
 / \
4   5
"
*/
let idCounter = 0;

function assertNodes(array: (Node | undefined)[]): array is Node[] {
  return array.every(element => element !== undefined);
}

export class Node {
  public right?: Node;
  public left?: Node;
  public value: number | string;
  public id: number;

  constructor(value: number | string) {
    this.value = value;
    this.id = idCounter++;
  }

  public children(): Node[] {
    const result = [];
    result.push(this.left);
    result.push(this.right);
    const filteredResult = result.filter(curr => curr !== undefined);
    if (!assertNodes(filteredResult)) {
      throw new Error("can't happen");
    } else {
      return filteredResult;
    }
  }
}

interface IQueue<T> {
  // eslint-disable-next-line no-unused-vars
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
}

class Queue<T> implements IQueue<T> {
  private storage: T[] = [];
  private capacity: number = Infinity;

  constructor(capacity: number = Infinity) {
    this.capacity = capacity;
  }

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }
  dequeue(): T | undefined {
    return this.storage.shift();
  }
  size(): number {
    return this.storage.length;
  }
}

export function breadthFirstTraversal(root: Node) {
  let result: (number | string)[] = [];
  let queue: IQueue<Node> = new Queue();
  let explored: Set<Node> = new Set<Node>();
  explored.add(root);
  queue.enqueue(root);
  while (queue.size() > 0) {
    {
      let current = queue.dequeue();
      if (current === undefined) {
        continue;
      }
      result.push(current.value);
      current.children().forEach(child => queue.enqueue(child));
    }
  }
  return result;
}

function depth(tree: Node | undefined): number {
  if (tree === undefined) {
    return 0;
  }
  return 1 + Math.max(depth(tree.left), depth(tree.right));
}

export function printTree(tree: Node) {
  console.log(breadthFirstTraversal(tree));
  console.log(depth(tree));
  console.log(printLevel(tree));

  return printLevel(tree);
}

function leftPad(string: string, number: number) {
  let result = "";
  for (let i = 0; i < number; i++) {
    result += " ";
  }
  return result + string;
}

export function printLevel(node: Node) {
  let level = 1;
  let result = "";
  result += leftPad(result, level * 2);
  result += node.value + "\n";
  result += " / \\\n";
  result += `${node.left?.value}   ${node.right?.value}`;
  return result;
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.left.left.left = new Node(6);

printTree(root);
