class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // If tree is empty, insert at root

    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    //Otherwise, find the correct spot for the new node.

    var current  = this.root;
    while(true) {

      //Compare the value to the current node's value. If the value is smaller, go to the left node; if greater, go to the right node.
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } 
      //If you reach a null child, insert the new node there.
      else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    // if val is less than current val, call insertRecursively on left subtree (if left subtree does not exist yet, create a new node there, then call insertRecursively).   
    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } 
    // Otherwise perform the same check and insertion process on the right subtree.
    else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
  
    while (currentNode) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        return currentNode; // Value found
      }
    }
  
    return undefined; // Value not found
  }
  

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (current === null) return undefined;

    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else if (val > current.val) {
      return this.findRecursively(val, current.right);
    }
    return current; // Value found
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      data.push(node.val); // visit the current node
      node.left && traverse(node.left); // go left if there's a left subtree
      node.right && traverse(node.right); // go right if there's a right subtree
    }

    traverse(current);
    return data;

//     Pre-order Traversal: The order of visiting nodes in pre-order traversal is: Root -> Left -> Right.
// Recursive Traversal: The function recursively visits the left and right subtrees of each node.
// Efficiency: The use of short-circuit evaluation (node.left && traverse(node.left)) is an efficient way to check for the existence of left and right children before making recursive calls.
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;
  
    function traverse(node) {
      if (node.left) traverse(node.left); // Traverse the left subtree
      data.push(node.val); // Visit the current node
      if (node.right) traverse(node.right); // Traverse the right subtree
    }
  
    traverse(current);
    return data;

    /*Key Points:
In-order Traversal: The order of visiting nodes in in-order traversal is: Left -> Root -> Right.
Sorted Order: In a binary search tree, in-order traversal will visit the nodes in ascending order of their values.
Recursive Traversal: The function recursively visits the left and right subtrees of each node. */
  }
  

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;
  
    function traverse(node) {
      if (node.left) traverse(node.left); // Traverse the left subtree
      if (node.right) traverse(node.right); // Traverse the right subtree
      data.push(node.val); // Visit the current node
    }
  
    traverse(current);
    return data;

//     Key Points:
// Post-order Traversal: The order of visiting nodes in post-order traversal is: Left -> Right -> Root.
// Recursive Traversal: The function recursively visits the left and right subtrees of each node before visiting the current node.
// Use Cases: Post-order traversal is often used in scenarios like deleting nodes in a tree or evaluating expressions in expression trees.
  }
  

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];
  
    queue.push(node);
  
    while (queue.length) {
      node = queue.shift(); // Remove the first node from the queue
      data.push(node.val); // Visit the node
  
      if (node.left) {
        queue.push(node.left); // Add left child to the queue
      }
      if (node.right) {
        queue.push(node.right); // Add right child to the queue
      }
    }
  
    return data;
  }

//   Key Points:
// Breadth-First Search (BFS): BFS explores all nodes at the current level before moving on to the next level. It traverses the tree level by level, starting from the root.
// Queue Usage: A queue is essential for BFS as it helps in maintaining the order of nodes to be visited, ensuring that nodes are processed level by level.
// Iteration: The method uses a while loop to iterate through the tree, visiting nodes and adding their children to the queue.
  

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent = null;
  
    // Find the node to remove and its parent
    while (nodeToRemove && nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }
  
    if (!nodeToRemove) return undefined; // Node to remove not found
  
    // Case 1: Node to remove has no children (leaf node)
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (nodeToRemove === this.root) {
        this.root = null; // Special case: Removing the root
      } else if (parent.left === nodeToRemove) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // Case 2: Node to remove has two children
    else if (nodeToRemove.left && nodeToRemove.right) {
      let successorParent = nodeToRemove;
      let successor = nodeToRemove.right;
  
      // Find the in-order successor (smallest value in the right subtree)
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
  
      // Replace nodeToRemove's value with successor's value
      nodeToRemove.val = successor.val;
  
      // Remove successor
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }
    // Case 3: Node to remove has one child
    else {
      let child = nodeToRemove.left ? nodeToRemove.left : nodeToRemove.right;
  
      if (nodeToRemove === this.root) {
        this.root = child; // Special case: Removing the root
      } else if (parent.left === nodeToRemove) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
  
    return nodeToRemove;
  }
  

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (!current) return true; // An empty tree is balanced
  
    function minDepth(node) {
      if (!node) return 0;
      return 1 + Math.min(minDepth(node.left), minDepth(node.right));
    }
  
    function maxDepth(node) {
      if (!node) return 0;
      return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
    }
  
    return maxDepth(current) - minDepth(current) <= 1;
  }
  

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;
  
    let parent = null;
    while (current.right) {
      parent = current;
      current = current.right;
    }
  
    // If current (largest) has a left subtree
    if (current.left) {
      let node = current.left;
      while (node.right) {
        node = node.right;
      }
      return node.val;
    }
  
    // If largest node has no left subtree, parent is the second largest
    return parent ? parent.val : undefined;
  }
  
}

module.exports = BinarySearchTree;
