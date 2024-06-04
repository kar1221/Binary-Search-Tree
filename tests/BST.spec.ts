import { BinarySearchTree } from "../src/Binary-Search-Tree";
import {expect} from "chai"

const BST = new BinarySearchTree();

const randomArray: number[] = [];

for(let i = 0; i < 10; i++) {
  const random = Math.floor(Math.random() * 100);
  randomArray.push(random);
}

BST.fromArray(randomArray);

describe("Binary Search Tree", () => {
  afterEach(() => {
    let tempString = "";
    BST.levelOrder(node => {
      tempString += node.value + "->"
    })
    console.log(`Level Order: ${tempString}`);

    tempString = "";
    BST.preOrder(node => {
      tempString += node.value + "->"
    })
    console.log(`Pre-Order: ${tempString}`);

    tempString = "";
    BST.inOrder(node => {
      tempString += node.value + "->"
    })
    console.log(`In-Order: ${tempString}`);

    tempString = "";
    BST.postOrder(node => {
      tempString += node.value + "->"
    })
    console.log(`Post-Order: ${tempString}`);
  })
  it("should be balanced upon creation", () => {
    expect(BST.isBalance()).to.equal(true);
  })

  it("should be unbalanced after adding several numbers > 100", () => {
    for(let i = 0; i < 10; i++) {
      BST.insert(Math.floor(100 + Math.random() * 200));
    }

    expect(BST.isBalance()).to.equal(false);
  })

  it("should be balanced after rebalancing", () => {
    BST.rebalance();

    expect(BST.isBalance()).to.equal(true);
  })
})