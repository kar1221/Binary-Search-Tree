import { QuickSort, RemoveDuplications } from "./Utils.ts";

class BinarySearchTree<T> {
  private root: Node<T> | null = null;

  public prettyPrint(node = this.root, prefix = "", isLeft = true): void {
    if(node === null) {
      
      return;
    }

    if(node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  public fromArray(array: Array<T>) {
    const sortedArray = QuickSort(RemoveDuplications(array));
    
    this.root = this.resolveTree(sortedArray);
  }

  public insert(value: T, node = this.root): Node<T> {
    if(node === null) {
      return new Node(value);
    }

    if(value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  private resolveTree(array: Array<T>): Node<T> | null {
    if(array.length <= 0) return null;

    const mid = Math.floor(array.length / 2);

    const node = new Node<T>(array[mid]);

    node.left = this.resolveTree(array.slice(0, mid));
    node.right = this.resolveTree(array.slice(mid + 1));

    return node;
  }

  public delete(value: T, node = this.root): Node<T> | null {
    if(node === null) return node;

    if(value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      if(node.left === null) return node.right;
      if(node.right === null) return node.left;

      node.value = this.minValue(node.right);
      node.right = this.delete(value, node.right);
    }

    return node;
  }

  private minValue(node: Node<T>): T {
    let minValue = node.value;

    while(node.left !== null) {
      minValue = node.left.value;
      node = node.left;
    }

    return minValue;
  }

  public find(value: T, node = this.root): Node<T> | null {
    if(node === null || node.value === value) {
      return node;
    }

    if(value < node.value) {
      return this.find(value, node.left);
    } 

    return this.find(value, node.right);
  }

  public levelOrder(callback: (node: Node<T>) => void): void {
    const queue = [ this.root ];

    while(queue.length > 0) {
      const currentNode = queue.shift();

      if(currentNode === null || currentNode === undefined) continue;

      callback(currentNode);

      if(currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if(currentNode.right !== null) {
        queue.push(currentNode.right);
      } 
    }
  }

  public inOrder(callback?: (node: Node<T>) => void, node = this.root): void {
    if(node === null) return;

    this.inOrder(callback, node.left);
    if(callback) callback(node);
    this.inOrder(callback, node.right);
  }

  public preOrder(callback?: (node: Node<T>) => void, node = this.root): void {
    if(node === null) return;

    if(callback) callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  public postOrder(callback?: (node: Node<T>) => void, node = this.root): void {
    if(node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    if(callback) callback(node);
  }

  public height(node = this.root): number {
    if(node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  public depth(node = this.root): number {
    if(node === null) return 0;

    const sum = this.depth(node.left) + this.depth(node.right);

    return 1 + sum;
  }

  public isBalance(node = this.root): boolean {
    if(node === null) return true;

    const leftDepth = this.height(node.left);
    const rightDepth = this.height(node.right);

    return Math.abs(leftDepth - rightDepth) <= 1;
  }

  public rebalance(): void {
    const tempArray: T[] = [];

    this.inOrder(node => tempArray.push(node.value));

    this.fromArray(tempArray);
  }
}

class Node<T> {
  public value: T;

  public left: Node<T> | null = null;

  public right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export { BinarySearchTree };