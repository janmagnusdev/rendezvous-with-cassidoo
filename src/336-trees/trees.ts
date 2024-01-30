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
  return array.every((element) => element !== undefined);
}

export class Node {
  public right?: Node;
  public left?: Node;
  public value: number | string;
  public id: number;
  public level?: number;

  constructor(value: number | string) {
    this.value = value;
    this.id = idCounter++;
  }

  public children(): Node[] {
    const result = [];
    result.push(this.left);
    result.push(this.right);
    const filteredResult = result.filter((curr) => curr !== undefined);
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
  peek(): T;
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
  peek(): T {
    return this.storage[0];
  }
}

type Value = string | number;

class Row {
  constructor(public level: number, public elements: Node[]) {}

  /**
   * if element is undefined, it means that the representing position in the tree should be filled with " "
   * @param element
   */
  public addElement(element: Node) {
    const maxElements = Math.pow(2, this.level);
    if (this.elements.length >= Math.pow(2, this.level)) {
      throw new Error(
        `Level with number ${this.level} can't contain more than ${maxElements} Elements! Currently: ${this.elements.length}`
      );
    }
    this.elements.push(element);
  }

  public toString() {
    return this.elements.reduce((acc: string, curr): string => {
      acc += `${curr ? curr : " "}   `;
      return acc;
    }, "");
  }
}

export function breadthFirst(root: Node): Row[] {
  let level = 0;
  // if encountering "x", new level is reached
  let result: Node[] = [];
  let queue: IQueue<Node> = new Queue();
  queue.enqueue(root);
  const seperator = new Node("x");
  queue.enqueue(seperator);
  while (queue.size() > 0) {
    {
      let current = queue.dequeue();
      if (current === undefined) {
        break;
      }
      if (current.value === seperator.value) {
        level++;
        if (queue.size() > 0) {
          queue.enqueue(seperator);
        }
        continue;
      }
      current.level = level;
      result.push(current);
      if (current.left !== undefined) {
        queue.enqueue(current.left);
      }
      if (current.right !== undefined) {
        queue.enqueue(current.right);
      }
    }
  }
  const rows: Row[] = [];
  /**
   * level is one too far after breadth search has finished
   */
  for (let i = 0; i < level; i++) {
    const nodesInRow = result.filter((node) => node.level === i);
    rows.push(new Row(i, nodesInRow));
  }
  return rows;
}

function depth(tree: Node | undefined): number {
  if (tree === undefined) {
    return 0;
  }
  return 1 + Math.max(depth(tree.left), depth(tree.right));
}

/*
    1 -> 2^0 elements, indentation is (depth - 1) * (2 - currentDepth)
   / \
  2   3 -> 2^1 elements, indentation is (depth - 1) * (2 - levelsFromRoot=1)
 / \
4   5   -> max. 2^2 elements
        -> max. 2^3 elements
"

> "
    1 -> root does not have any space between, since only one element; if depth > 1: spacer = 3 : 0;
   / \
  2   3
 / \
4   5 -> in between elements there is always 3 spaces free
"

    1
   / \ -> same indentation as level above minus 1; / only if left is given, \\ only if right is given
  2   3 -> even indeces place right above /, odd indeces place left above \\
 / \
4   5

print each element slot either as value or as undefined

rows type should have levelnumber and elements; 2^levelnumber is max. size of elements
print each row then, filling non existing elements with " "
search from left to right line wise using breadthFirstIteration
*/
export function printTree(tree: Node) {
  const rows = breadthFirst(tree);
  const treeDepth = depth(tree);
  const indentationPerLevel = 2;
  const spaceBetweenElements = 3;
  for (let currentDepth = 0; currentDepth < treeDepth; currentDepth++) {
    let row = rows[currentDepth];
    const indentation = indentationPerLevel * (treeDepth - currentDepth - 1);
    const elementString = row.elements.reduce((acc, curr): string => {
      return (acc += rightPad(curr.value.toString(), spaceBetweenElements));
    }, "");
    const padded = leftPad(elementString, indentation);
    console.log(padded);
  }
}

function leftPad(string: string, number: number) {
  let result = "";
  for (let i = 0; i < number; i++) {
    result += " ";
  }
  return result + string;
}

function rightPad(string: string, number: number) {
  let result = "";
  for (let i = 0; i < number; i++) {
    result += " ";
  }
  return string + result;
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);

printTree(root);
