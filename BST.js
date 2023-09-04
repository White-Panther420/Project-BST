class Tree{
    constructor(arrayData){
        this.root = this.buildTree(arrayData, 0 ,arrayData.length-1)
    }

    buildTree(array, start, end){
        if(start > end){
            return null
        }
        let mid = Math.floor((start+end)/2)
        //Set root to midpoint of array
        let newRootNode = new TNode(array[mid])

        // Build left subtree of root
        newRootNode.left = this.buildTree(array, start, mid-1)
        // Build right subtree of root
        newRootNode.right = this.buildTree(array, mid+1, end)

        // Return root with pointers to left and right subtrees
        return newRootNode
    }
    insertNode(nodeToInsert, root){
        // Make top-level root be the new node if tree is empty
        if(root === null){
            this.root = nodeToInsert
            // Check if node's data is less than root's data and if root has no left children
        }else if(nodeToInsert.data < root.data){
            // Recursively sink to left side until left child of root is null
            if(root.left !== null){
                this.insertNode(nodeToInsert, root.left)
            }else{
                root.left = nodeToInsert
            }

        }else if(nodeToInsert.data > root.data){
            // Recursively sink to right side until left child of root is null
            if(root.right !== null){
                this.insertNode(nodeToInsert, root.right)
            }else{
                root.right = nodeToInsert
            }
        }
    }
    deleteNode(keyToDelete, parentNode=null, currentNode){
        if(currentNode === null){
            console.log("Error! Unable to delete from empty tree")
        }else{
            // Search left and right subtrees for node to delete
            if(keyToDelete < currentNode.data){
                // Recursively sink to left side until left child of root is null
                if(currentNode.left !== null){
                    parentNode = currentNode
                    currentNode = currentNode.left
                    return this.deleteNode(keyToDelete, parentNode, currentNode)
                }

            }else if(keyToDelete > currentNode.data){
                // Recursively sink to right side until left child of root is null
                if(currentNode.right !== null){
                    parentNode = currentNode
                    currentNode = currentNode.right
                    return this.deleteNode(keyToDelete, parentNode, currentNode)
                }
            }
            // We found the node to delete
            if(keyToDelete === currentNode.data){
                // CASE 1: Deleting a leaf node with no children
                if(currentNode.left === null && currentNode.right === null){
                    // Check which side of parent root node is on and delete accordinglly
                    if(currentNode.data > parentNode.data){
                        parentNode.right = null
                    }else{
                        parentNode.left = null
                    }
                // CASE 2: Deleting from a leaf node with one child
                }else if (currentNode.left === null || currentNode.right === null) {
                    // Assign tempNode to whichever one is not null
                    let tempNode = currentNode.left || currentNode.right;
                    if (currentNode.data > parentNode.data) {
                        // According to BST Property, tempnode and its descendants will be > than parentNode
                        parentNode.right = tempNode;
                    } else {
                        parentNode.left = tempNode;
                    }
                    currentNode = null
                // CASE 3: Deleting a node that has both children
                }else{
                    let tempNode = currentNode.right
                    let prevNode = currentNode.right
                    tempNode = tempNode.left
                    // Using Successor BST property, we find the smallest node that is bigger
                    // than currentNode by going all the way to the left of currentNode.right
                    while(tempNode.left !== null){
                        tempNode = tempNode.left
                        prevNode = prevNode.left
                    }
                    // CASE 3.1: Replacing currentNode with a node that has no children
                    if(tempNode.left === null && tempNode.right == null){
                        // Delete left child (tempNode) to avoid infinite recursion
                        prevNode.left = null 

                        //Copying ptrs so we don't lose them
                        tempNode.left = currentNode.left
                        tempNode.right = currentNode.right
                        
                        if(currentNode.data > parentNode.data){
                            parentNode.right = tempNode
                        }else{
                            parentNode.left = tempNode
                        }
                        currentNode = null
                    }
                }
            }else{
                console.log(`ERROR! Node with key of ${keyToDelete} does not exist`)
            }
        }
    }
    findNode(key, root){
        if(root === null){
            console.log("ERROR! Node not found. Tree is empty")
        }else{
            // Recursivelly search for node
            if(key < root.data){
                if(root.left !== null)
                    return this.findNode(key, root.left)
            }else if(key > root.data){
                if(root.right !== null)
                    return this.findNode(key, root.right)
            }
            if(key === root.data){
                console.log(`The key ${key} was found!`)
                return;
            }else[
                console.log(`Error! Key ${key} does not exist in tree`)
            ]
        }
    }
    levelOrder(root){
        if(root === null){
            console.log("Tree is empty")
        }else{
            let queue = []
            queue.push(root) //Enqueue unvisited root enode
            // While there is at least one discovered node
            while(queue.length > 0){
                root = queue[0]
                if(root.left !== null){
                    queue.push(root.left)
                }
                if(root.right !== null){
                    queue.push(root.right)
                }
                queue.splice(0,1)
                console.log(root.data)
            }
        }
    }
    inOrder(root){
        //Travel <left><root><right>
        if(root === null){
            console.log("The tree is empty")
        }else{
            if(root.left !== null){
                this.inOrder(root.left)
            }
            console.log(root.data)
            if(root.right !== null){
                this.inOrder(root.right)
            }
        }
    }
    preOrder(root){
        //Travel <root><left><right>
        if(root === null){
            console.log("The tree is empty")
        }else{
            console.log(root.data)
            if(root.left !== null){
                this.preOrder(root.left)
            }
            if(root.right !== null){
                this.preOrder(root.right)
            }
        }
    }
    
    postOrder(root){
        //Travel <left><right><root>
        if(root === null){
            console.log("The tree is empty")
        }else{
            if(root.left !== null){
                this.postOrder(root.left)
            }
            if(root.right !== null){
                this.postOrder(root.right)
            }
            console.log(root.data)
        }
    }
    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
      
}

class TNode{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}

const mergeSort = (arrayToSort) =>{
    if(arrayToSort.length === 0){
        return arrayToSort
    }
    let p = 1;
    let q = Math.floor(arrayToSort.length/2)
    let r = arrayToSort.length

    if(p === r){
        return arrayToSort //Single element sorted array
    }

    const leftHalf = [...arrayToSort.slice(0, q)]
    const rightHalf = [...arrayToSort.slice(q, r)]
    let leftArray = mergeSort(leftHalf)
    let rightArray = mergeSort(rightHalf)

    return merge(leftArray, rightArray)
}

const merge = (arrayA, arrayB) =>{
    let tempArray = []

    while(arrayA.length > 0 && arrayB.length > 0){
        if(arrayA[0] <= arrayB[0]){
            tempArray.push(arrayA[0])
            arrayA.splice(0,1)
        }else if(arrayB[0] < arrayA[0]){
            tempArray.push(arrayB[0])
            arrayB.splice(0,1)
        }
    }

    while(arrayA.length > 0){
        tempArray.push(arrayA[0])
        arrayA.splice(0,1)
    }
    while(arrayB.length > 0){
        tempArray.push(arrayB[0])
        arrayB.splice(0,1)
    }

    return tempArray
}



const newArray = [3,8,5,1,7,2,3]
let sortedArray = mergeSort(newArray)  //Sort array
sortedArray = [...new Set(sortedArray)]  //Remove duplicate elements


/********** BUILDING TREE **********/
const newBST = new Tree(sortedArray)
console.log("PRINTING BUILD TREE OPERATION. . . ")
newBST.prettyPrint(newBST.root)

/********** INSERTING NODES INTO TREE **********/
let newNode1 = new TNode(10)
let newNode2 = new TNode(6)
let newNode3 = new TNode(9)
let newNode4 = new TNode(11)
let newNode5 = new TNode(0)
let newNode6 = new TNode(10)

newBST.insertNode(newNode1, newBST.root)
newBST.insertNode(newNode6, newBST.root)
newBST.insertNode(newNode2, newBST.root)
newBST.insertNode(newNode3, newBST.root)
newBST.insertNode(newNode4, newBST.root)
newBST.insertNode(newNode5, newBST.root)

console.log("PRINTING INSERRT OPERATION. . . ")
newBST.prettyPrint(newBST.root)

/********** DELETING LEAF NODES FROM TREE **********/
newBST.deleteNode(6, null, newBST.root)
newBST.deleteNode(0, null, newBST.root)
newBST.deleteNode(5, null, newBST.root)
newBST.deleteNode(8, null, newBST.root)
newBST.deleteNode(7, null, newBST.root)
newBST.deleteNode(15, null, newBST.root)
console.log("PRINTING DELETE LEAF OPERATION. . . ")
newBST.prettyPrint(newBST.root)


/********** SEARCHING FOR NODE KEY IN TREE **********/
newBST.findNode(3, newBST.root)
newBST.findNode(9, newBST.root)
newBST.findNode(10, newBST.root)
newBST.findNode(15, newBST.root)
let newNode7 = new TNode(15)
newBST.insertNode(newNode7, newBST.root)
newBST.findNode(15, newBST.root)
console.log("PRINTING UPDATED TREE AFTER INSERTING 15")
newBST.prettyPrint(newBST.root)

/********** TRAVERSING TREE **********/
console.log("PRINTING LEVEL ORDER BFS TRAVERSAL")
newBST.levelOrder(newBST.root)
console.log("PRINTING IN-ODRDER TRAVERSAL")
newBST.inOrder(newBST.root)
console.log("PRINTING PRE-ODRDER TRAVERSAL")
newBST.preOrder(newBST.root)
console.log("PRINTING POST-ODRDER TRAVERSAL")
newBST.postOrder(newBST.root)