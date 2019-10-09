["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/structs/heap.js"],"~:js","goog.provide(\"goog.structs.Heap\");\ngoog.require(\"goog.array\");\ngoog.require(\"goog.object\");\ngoog.require(\"goog.structs.Node\");\n/**\n * @constructor\n * @param {(goog.structs.Heap|Object)=} opt_heap\n * @template K, V\n */\ngoog.structs.Heap = function(opt_heap) {\n  /** @private @type {Array<goog.structs.Node>} */ this.nodes_ = [];\n  if (opt_heap) {\n    this.insertAll(opt_heap);\n  }\n};\n/**\n * @param {K} key\n * @param {V} value\n */\ngoog.structs.Heap.prototype.insert = function(key, value) {\n  var node = new goog.structs.Node(key, value);\n  var nodes = this.nodes_;\n  nodes.push(node);\n  this.moveUp_(nodes.length - 1);\n};\n/**\n * @param {(goog.structs.Heap|Object)} heap\n */\ngoog.structs.Heap.prototype.insertAll = function(heap) {\n  var keys, values;\n  if (heap instanceof goog.structs.Heap) {\n    keys = heap.getKeys();\n    values = heap.getValues();\n    if (this.getCount() <= 0) {\n      var nodes = this.nodes_;\n      for (var i = 0; i < keys.length; i++) {\n        nodes.push(new goog.structs.Node(keys[i], values[i]));\n      }\n      return;\n    }\n  } else {\n    keys = goog.object.getKeys(heap);\n    values = goog.object.getValues(heap);\n  }\n  for (var i = 0; i < keys.length; i++) {\n    this.insert(keys[i], values[i]);\n  }\n};\n/**\n * @return {V}\n */\ngoog.structs.Heap.prototype.remove = function() {\n  var nodes = this.nodes_;\n  var count = nodes.length;\n  var rootNode = nodes[0];\n  if (count <= 0) {\n    return undefined;\n  } else {\n    if (count == 1) {\n      goog.array.clear(nodes);\n    } else {\n      nodes[0] = nodes.pop();\n      this.moveDown_(0);\n    }\n  }\n  return rootNode.getValue();\n};\n/**\n * @return {V}\n */\ngoog.structs.Heap.prototype.peek = function() {\n  var nodes = this.nodes_;\n  if (nodes.length == 0) {\n    return undefined;\n  }\n  return nodes[0].getValue();\n};\n/**\n * @return {K}\n */\ngoog.structs.Heap.prototype.peekKey = function() {\n  return this.nodes_[0] && this.nodes_[0].getKey();\n};\n/**\n * @private\n * @param {number} index\n */\ngoog.structs.Heap.prototype.moveDown_ = function(index) {\n  var nodes = this.nodes_;\n  var count = nodes.length;\n  var node = nodes[index];\n  while (index < count >> 1) {\n    var leftChildIndex = this.getLeftChildIndex_(index);\n    var rightChildIndex = this.getRightChildIndex_(index);\n    var smallerChildIndex = rightChildIndex < count && nodes[rightChildIndex].getKey() < nodes[leftChildIndex].getKey() ? rightChildIndex : leftChildIndex;\n    if (nodes[smallerChildIndex].getKey() > node.getKey()) {\n      break;\n    }\n    nodes[index] = nodes[smallerChildIndex];\n    index = smallerChildIndex;\n  }\n  nodes[index] = node;\n};\n/**\n * @private\n * @param {number} index\n */\ngoog.structs.Heap.prototype.moveUp_ = function(index) {\n  var nodes = this.nodes_;\n  var node = nodes[index];\n  while (index > 0) {\n    var parentIndex = this.getParentIndex_(index);\n    if (nodes[parentIndex].getKey() > node.getKey()) {\n      nodes[index] = nodes[parentIndex];\n      index = parentIndex;\n    } else {\n      break;\n    }\n  }\n  nodes[index] = node;\n};\n/**\n * @private\n * @param {number} index\n * @return {number}\n */\ngoog.structs.Heap.prototype.getLeftChildIndex_ = function(index) {\n  return index * 2 + 1;\n};\n/**\n * @private\n * @param {number} index\n * @return {number}\n */\ngoog.structs.Heap.prototype.getRightChildIndex_ = function(index) {\n  return index * 2 + 2;\n};\n/**\n * @private\n * @param {number} index\n * @return {number}\n */\ngoog.structs.Heap.prototype.getParentIndex_ = function(index) {\n  return index - 1 >> 1;\n};\n/**\n * @return {!Array<V>}\n */\ngoog.structs.Heap.prototype.getValues = function() {\n  var nodes = this.nodes_;\n  var rv = [];\n  var l = nodes.length;\n  for (var i = 0; i < l; i++) {\n    rv.push(nodes[i].getValue());\n  }\n  return rv;\n};\n/**\n * @return {!Array<K>}\n */\ngoog.structs.Heap.prototype.getKeys = function() {\n  var nodes = this.nodes_;\n  var rv = [];\n  var l = nodes.length;\n  for (var i = 0; i < l; i++) {\n    rv.push(nodes[i].getKey());\n  }\n  return rv;\n};\n/**\n * @param {V} val\n * @return {boolean}\n */\ngoog.structs.Heap.prototype.containsValue = function(val) {\n  return goog.array.some(this.nodes_, function(node) {\n    return node.getValue() == val;\n  });\n};\n/**\n * @param {K} key\n * @return {boolean}\n */\ngoog.structs.Heap.prototype.containsKey = function(key) {\n  return goog.array.some(this.nodes_, function(node) {\n    return node.getKey() == key;\n  });\n};\n/**\n * @return {!goog.structs.Heap}\n */\ngoog.structs.Heap.prototype.clone = function() {\n  return new goog.structs.Heap(this);\n};\n/**\n * @return {number}\n */\ngoog.structs.Heap.prototype.getCount = function() {\n  return this.nodes_.length;\n};\n/**\n * @return {boolean}\n */\ngoog.structs.Heap.prototype.isEmpty = function() {\n  return goog.array.isEmpty(this.nodes_);\n};\ngoog.structs.Heap.prototype.clear = function() {\n  goog.array.clear(this.nodes_);\n};\n","~:source","// Copyright 2006 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Datastructure: Heap.\n *\n *\n * This file provides the implementation of a Heap datastructure. Smaller keys\n * rise to the top.\n *\n * The big-O notation for all operations are below:\n * <pre>\n *  Method          big-O\n * ----------------------------------------------------------------------------\n * - insert         O(logn)\n * - remove         O(logn)\n * - peek           O(1)\n * - contains       O(n)\n * </pre>\n */\n// TODO(user): Should this rely on natural ordering via some Comparable\n//     interface?\n\n\ngoog.provide('goog.structs.Heap');\n\ngoog.require('goog.array');\ngoog.require('goog.object');\ngoog.require('goog.structs.Node');\n\n\n\n/**\n * Class for a Heap datastructure.\n *\n * @param {goog.structs.Heap|Object=} opt_heap Optional goog.structs.Heap or\n *     Object to initialize heap with.\n * @constructor\n * @template K, V\n */\ngoog.structs.Heap = function(opt_heap) {\n  /**\n   * The nodes of the heap.\n   * @private\n   * @type {Array<goog.structs.Node>}\n   */\n  this.nodes_ = [];\n\n  if (opt_heap) {\n    this.insertAll(opt_heap);\n  }\n};\n\n\n/**\n * Insert the given value into the heap with the given key.\n * @param {K} key The key.\n * @param {V} value The value.\n */\ngoog.structs.Heap.prototype.insert = function(key, value) {\n  var node = new goog.structs.Node(key, value);\n  var nodes = this.nodes_;\n  nodes.push(node);\n  this.moveUp_(nodes.length - 1);\n};\n\n\n/**\n * Adds multiple key-value pairs from another goog.structs.Heap or Object\n * @param {goog.structs.Heap|Object} heap Object containing the data to add.\n */\ngoog.structs.Heap.prototype.insertAll = function(heap) {\n  var keys, values;\n  if (heap instanceof goog.structs.Heap) {\n    keys = heap.getKeys();\n    values = heap.getValues();\n\n    // If it is a heap and the current heap is empty, I can rely on the fact\n    // that the keys/values are in the correct order to put in the underlying\n    // structure.\n    if (this.getCount() <= 0) {\n      var nodes = this.nodes_;\n      for (var i = 0; i < keys.length; i++) {\n        nodes.push(new goog.structs.Node(keys[i], values[i]));\n      }\n      return;\n    }\n  } else {\n    keys = goog.object.getKeys(heap);\n    values = goog.object.getValues(heap);\n  }\n\n  for (var i = 0; i < keys.length; i++) {\n    this.insert(keys[i], values[i]);\n  }\n};\n\n\n/**\n * Retrieves and removes the root value of this heap.\n * @return {V} The value removed from the root of the heap.  Returns\n *     undefined if the heap is empty.\n */\ngoog.structs.Heap.prototype.remove = function() {\n  var nodes = this.nodes_;\n  var count = nodes.length;\n  var rootNode = nodes[0];\n  if (count <= 0) {\n    return undefined;\n  } else if (count == 1) {\n    goog.array.clear(nodes);\n  } else {\n    nodes[0] = nodes.pop();\n    this.moveDown_(0);\n  }\n  return rootNode.getValue();\n};\n\n\n/**\n * Retrieves but does not remove the root value of this heap.\n * @return {V} The value at the root of the heap. Returns\n *     undefined if the heap is empty.\n */\ngoog.structs.Heap.prototype.peek = function() {\n  var nodes = this.nodes_;\n  if (nodes.length == 0) {\n    return undefined;\n  }\n  return nodes[0].getValue();\n};\n\n\n/**\n * Retrieves but does not remove the key of the root node of this heap.\n * @return {K} The key at the root of the heap. Returns undefined if the\n *     heap is empty.\n */\ngoog.structs.Heap.prototype.peekKey = function() {\n  return this.nodes_[0] && this.nodes_[0].getKey();\n};\n\n\n/**\n * Moves the node at the given index down to its proper place in the heap.\n * @param {number} index The index of the node to move down.\n * @private\n */\ngoog.structs.Heap.prototype.moveDown_ = function(index) {\n  var nodes = this.nodes_;\n  var count = nodes.length;\n\n  // Save the node being moved down.\n  var node = nodes[index];\n  // While the current node has a child.\n  while (index < (count >> 1)) {\n    var leftChildIndex = this.getLeftChildIndex_(index);\n    var rightChildIndex = this.getRightChildIndex_(index);\n\n    // Determine the index of the smaller child.\n    var smallerChildIndex = rightChildIndex < count &&\n            nodes[rightChildIndex].getKey() < nodes[leftChildIndex].getKey() ?\n        rightChildIndex :\n        leftChildIndex;\n\n    // If the node being moved down is smaller than its children, the node\n    // has found the correct index it should be at.\n    if (nodes[smallerChildIndex].getKey() > node.getKey()) {\n      break;\n    }\n\n    // If not, then take the smaller child as the current node.\n    nodes[index] = nodes[smallerChildIndex];\n    index = smallerChildIndex;\n  }\n  nodes[index] = node;\n};\n\n\n/**\n * Moves the node at the given index up to its proper place in the heap.\n * @param {number} index The index of the node to move up.\n * @private\n */\ngoog.structs.Heap.prototype.moveUp_ = function(index) {\n  var nodes = this.nodes_;\n  var node = nodes[index];\n\n  // While the node being moved up is not at the root.\n  while (index > 0) {\n    // If the parent is less than the node being moved up, move the parent down.\n    var parentIndex = this.getParentIndex_(index);\n    if (nodes[parentIndex].getKey() > node.getKey()) {\n      nodes[index] = nodes[parentIndex];\n      index = parentIndex;\n    } else {\n      break;\n    }\n  }\n  nodes[index] = node;\n};\n\n\n/**\n * Gets the index of the left child of the node at the given index.\n * @param {number} index The index of the node to get the left child for.\n * @return {number} The index of the left child.\n * @private\n */\ngoog.structs.Heap.prototype.getLeftChildIndex_ = function(index) {\n  return index * 2 + 1;\n};\n\n\n/**\n * Gets the index of the right child of the node at the given index.\n * @param {number} index The index of the node to get the right child for.\n * @return {number} The index of the right child.\n * @private\n */\ngoog.structs.Heap.prototype.getRightChildIndex_ = function(index) {\n  return index * 2 + 2;\n};\n\n\n/**\n * Gets the index of the parent of the node at the given index.\n * @param {number} index The index of the node to get the parent for.\n * @return {number} The index of the parent.\n * @private\n */\ngoog.structs.Heap.prototype.getParentIndex_ = function(index) {\n  return (index - 1) >> 1;\n};\n\n\n/**\n * Gets the values of the heap.\n * @return {!Array<V>} The values in the heap.\n */\ngoog.structs.Heap.prototype.getValues = function() {\n  var nodes = this.nodes_;\n  var rv = [];\n  var l = nodes.length;\n  for (var i = 0; i < l; i++) {\n    rv.push(nodes[i].getValue());\n  }\n  return rv;\n};\n\n\n/**\n * Gets the keys of the heap.\n * @return {!Array<K>} The keys in the heap.\n */\ngoog.structs.Heap.prototype.getKeys = function() {\n  var nodes = this.nodes_;\n  var rv = [];\n  var l = nodes.length;\n  for (var i = 0; i < l; i++) {\n    rv.push(nodes[i].getKey());\n  }\n  return rv;\n};\n\n\n/**\n * Whether the heap contains the given value.\n * @param {V} val The value to check for.\n * @return {boolean} Whether the heap contains the value.\n */\ngoog.structs.Heap.prototype.containsValue = function(val) {\n  return goog.array.some(\n      this.nodes_, function(node) { return node.getValue() == val; });\n};\n\n\n/**\n * Whether the heap contains the given key.\n * @param {K} key The key to check for.\n * @return {boolean} Whether the heap contains the key.\n */\ngoog.structs.Heap.prototype.containsKey = function(key) {\n  return goog.array.some(\n      this.nodes_, function(node) { return node.getKey() == key; });\n};\n\n\n/**\n * Clones a heap and returns a new heap\n * @return {!goog.structs.Heap} A new goog.structs.Heap with the same key-value\n *     pairs.\n */\ngoog.structs.Heap.prototype.clone = function() {\n  return new goog.structs.Heap(this);\n};\n\n\n/**\n * The number of key-value pairs in the map\n * @return {number} The number of pairs.\n */\ngoog.structs.Heap.prototype.getCount = function() {\n  return this.nodes_.length;\n};\n\n\n/**\n * Returns true if this heap contains no elements.\n * @return {boolean} Whether this heap contains no elements.\n */\ngoog.structs.Heap.prototype.isEmpty = function() {\n  return goog.array.isEmpty(this.nodes_);\n};\n\n\n/**\n * Removes all elements from the heap.\n */\ngoog.structs.Heap.prototype.clear = function() {\n  goog.array.clear(this.nodes_);\n};\n","~:compiled-at",1567452991372,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.structs.heap.js\",\n\"lineCount\":209,\n\"mappings\":\"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\",\n\"sources\":[\"goog/structs/heap.js\"],\n\"sourcesContent\":[\"// Copyright 2006 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Datastructure: Heap.\\n *\\n *\\n * This file provides the implementation of a Heap datastructure. Smaller keys\\n * rise to the top.\\n *\\n * The big-O notation for all operations are below:\\n * <pre>\\n *  Method          big-O\\n * ----------------------------------------------------------------------------\\n * - insert         O(logn)\\n * - remove         O(logn)\\n * - peek           O(1)\\n * - contains       O(n)\\n * </pre>\\n */\\n// TODO(user): Should this rely on natural ordering via some Comparable\\n//     interface?\\n\\n\\ngoog.provide('goog.structs.Heap');\\n\\ngoog.require('goog.array');\\ngoog.require('goog.object');\\ngoog.require('goog.structs.Node');\\n\\n\\n\\n/**\\n * Class for a Heap datastructure.\\n *\\n * @param {goog.structs.Heap|Object=} opt_heap Optional goog.structs.Heap or\\n *     Object to initialize heap with.\\n * @constructor\\n * @template K, V\\n */\\ngoog.structs.Heap = function(opt_heap) {\\n  /**\\n   * The nodes of the heap.\\n   * @private\\n   * @type {Array<goog.structs.Node>}\\n   */\\n  this.nodes_ = [];\\n\\n  if (opt_heap) {\\n    this.insertAll(opt_heap);\\n  }\\n};\\n\\n\\n/**\\n * Insert the given value into the heap with the given key.\\n * @param {K} key The key.\\n * @param {V} value The value.\\n */\\ngoog.structs.Heap.prototype.insert = function(key, value) {\\n  var node = new goog.structs.Node(key, value);\\n  var nodes = this.nodes_;\\n  nodes.push(node);\\n  this.moveUp_(nodes.length - 1);\\n};\\n\\n\\n/**\\n * Adds multiple key-value pairs from another goog.structs.Heap or Object\\n * @param {goog.structs.Heap|Object} heap Object containing the data to add.\\n */\\ngoog.structs.Heap.prototype.insertAll = function(heap) {\\n  var keys, values;\\n  if (heap instanceof goog.structs.Heap) {\\n    keys = heap.getKeys();\\n    values = heap.getValues();\\n\\n    // If it is a heap and the current heap is empty, I can rely on the fact\\n    // that the keys/values are in the correct order to put in the underlying\\n    // structure.\\n    if (this.getCount() <= 0) {\\n      var nodes = this.nodes_;\\n      for (var i = 0; i < keys.length; i++) {\\n        nodes.push(new goog.structs.Node(keys[i], values[i]));\\n      }\\n      return;\\n    }\\n  } else {\\n    keys = goog.object.getKeys(heap);\\n    values = goog.object.getValues(heap);\\n  }\\n\\n  for (var i = 0; i < keys.length; i++) {\\n    this.insert(keys[i], values[i]);\\n  }\\n};\\n\\n\\n/**\\n * Retrieves and removes the root value of this heap.\\n * @return {V} The value removed from the root of the heap.  Returns\\n *     undefined if the heap is empty.\\n */\\ngoog.structs.Heap.prototype.remove = function() {\\n  var nodes = this.nodes_;\\n  var count = nodes.length;\\n  var rootNode = nodes[0];\\n  if (count <= 0) {\\n    return undefined;\\n  } else if (count == 1) {\\n    goog.array.clear(nodes);\\n  } else {\\n    nodes[0] = nodes.pop();\\n    this.moveDown_(0);\\n  }\\n  return rootNode.getValue();\\n};\\n\\n\\n/**\\n * Retrieves but does not remove the root value of this heap.\\n * @return {V} The value at the root of the heap. Returns\\n *     undefined if the heap is empty.\\n */\\ngoog.structs.Heap.prototype.peek = function() {\\n  var nodes = this.nodes_;\\n  if (nodes.length == 0) {\\n    return undefined;\\n  }\\n  return nodes[0].getValue();\\n};\\n\\n\\n/**\\n * Retrieves but does not remove the key of the root node of this heap.\\n * @return {K} The key at the root of the heap. Returns undefined if the\\n *     heap is empty.\\n */\\ngoog.structs.Heap.prototype.peekKey = function() {\\n  return this.nodes_[0] && this.nodes_[0].getKey();\\n};\\n\\n\\n/**\\n * Moves the node at the given index down to its proper place in the heap.\\n * @param {number} index The index of the node to move down.\\n * @private\\n */\\ngoog.structs.Heap.prototype.moveDown_ = function(index) {\\n  var nodes = this.nodes_;\\n  var count = nodes.length;\\n\\n  // Save the node being moved down.\\n  var node = nodes[index];\\n  // While the current node has a child.\\n  while (index < (count >> 1)) {\\n    var leftChildIndex = this.getLeftChildIndex_(index);\\n    var rightChildIndex = this.getRightChildIndex_(index);\\n\\n    // Determine the index of the smaller child.\\n    var smallerChildIndex = rightChildIndex < count &&\\n            nodes[rightChildIndex].getKey() < nodes[leftChildIndex].getKey() ?\\n        rightChildIndex :\\n        leftChildIndex;\\n\\n    // If the node being moved down is smaller than its children, the node\\n    // has found the correct index it should be at.\\n    if (nodes[smallerChildIndex].getKey() > node.getKey()) {\\n      break;\\n    }\\n\\n    // If not, then take the smaller child as the current node.\\n    nodes[index] = nodes[smallerChildIndex];\\n    index = smallerChildIndex;\\n  }\\n  nodes[index] = node;\\n};\\n\\n\\n/**\\n * Moves the node at the given index up to its proper place in the heap.\\n * @param {number} index The index of the node to move up.\\n * @private\\n */\\ngoog.structs.Heap.prototype.moveUp_ = function(index) {\\n  var nodes = this.nodes_;\\n  var node = nodes[index];\\n\\n  // While the node being moved up is not at the root.\\n  while (index > 0) {\\n    // If the parent is less than the node being moved up, move the parent down.\\n    var parentIndex = this.getParentIndex_(index);\\n    if (nodes[parentIndex].getKey() > node.getKey()) {\\n      nodes[index] = nodes[parentIndex];\\n      index = parentIndex;\\n    } else {\\n      break;\\n    }\\n  }\\n  nodes[index] = node;\\n};\\n\\n\\n/**\\n * Gets the index of the left child of the node at the given index.\\n * @param {number} index The index of the node to get the left child for.\\n * @return {number} The index of the left child.\\n * @private\\n */\\ngoog.structs.Heap.prototype.getLeftChildIndex_ = function(index) {\\n  return index * 2 + 1;\\n};\\n\\n\\n/**\\n * Gets the index of the right child of the node at the given index.\\n * @param {number} index The index of the node to get the right child for.\\n * @return {number} The index of the right child.\\n * @private\\n */\\ngoog.structs.Heap.prototype.getRightChildIndex_ = function(index) {\\n  return index * 2 + 2;\\n};\\n\\n\\n/**\\n * Gets the index of the parent of the node at the given index.\\n * @param {number} index The index of the node to get the parent for.\\n * @return {number} The index of the parent.\\n * @private\\n */\\ngoog.structs.Heap.prototype.getParentIndex_ = function(index) {\\n  return (index - 1) >> 1;\\n};\\n\\n\\n/**\\n * Gets the values of the heap.\\n * @return {!Array<V>} The values in the heap.\\n */\\ngoog.structs.Heap.prototype.getValues = function() {\\n  var nodes = this.nodes_;\\n  var rv = [];\\n  var l = nodes.length;\\n  for (var i = 0; i < l; i++) {\\n    rv.push(nodes[i].getValue());\\n  }\\n  return rv;\\n};\\n\\n\\n/**\\n * Gets the keys of the heap.\\n * @return {!Array<K>} The keys in the heap.\\n */\\ngoog.structs.Heap.prototype.getKeys = function() {\\n  var nodes = this.nodes_;\\n  var rv = [];\\n  var l = nodes.length;\\n  for (var i = 0; i < l; i++) {\\n    rv.push(nodes[i].getKey());\\n  }\\n  return rv;\\n};\\n\\n\\n/**\\n * Whether the heap contains the given value.\\n * @param {V} val The value to check for.\\n * @return {boolean} Whether the heap contains the value.\\n */\\ngoog.structs.Heap.prototype.containsValue = function(val) {\\n  return goog.array.some(\\n      this.nodes_, function(node) { return node.getValue() == val; });\\n};\\n\\n\\n/**\\n * Whether the heap contains the given key.\\n * @param {K} key The key to check for.\\n * @return {boolean} Whether the heap contains the key.\\n */\\ngoog.structs.Heap.prototype.containsKey = function(key) {\\n  return goog.array.some(\\n      this.nodes_, function(node) { return node.getKey() == key; });\\n};\\n\\n\\n/**\\n * Clones a heap and returns a new heap\\n * @return {!goog.structs.Heap} A new goog.structs.Heap with the same key-value\\n *     pairs.\\n */\\ngoog.structs.Heap.prototype.clone = function() {\\n  return new goog.structs.Heap(this);\\n};\\n\\n\\n/**\\n * The number of key-value pairs in the map\\n * @return {number} The number of pairs.\\n */\\ngoog.structs.Heap.prototype.getCount = function() {\\n  return this.nodes_.length;\\n};\\n\\n\\n/**\\n * Returns true if this heap contains no elements.\\n * @return {boolean} Whether this heap contains no elements.\\n */\\ngoog.structs.Heap.prototype.isEmpty = function() {\\n  return goog.array.isEmpty(this.nodes_);\\n};\\n\\n\\n/**\\n * Removes all elements from the heap.\\n */\\ngoog.structs.Heap.prototype.clear = function() {\\n  goog.array.clear(this.nodes_);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"structs\",\"Heap\",\"goog.structs.Heap\",\"opt_heap\",\"nodes_\",\"insertAll\",\"prototype\",\"insert\",\"goog.structs.Heap.prototype.insert\",\"key\",\"value\",\"node\",\"Node\",\"nodes\",\"push\",\"moveUp_\",\"length\",\"goog.structs.Heap.prototype.insertAll\",\"heap\",\"keys\",\"values\",\"getKeys\",\"getValues\",\"getCount\",\"i\",\"object\",\"remove\",\"goog.structs.Heap.prototype.remove\",\"count\",\"rootNode\",\"undefined\",\"array\",\"clear\",\"pop\",\"moveDown_\",\"getValue\",\"peek\",\"goog.structs.Heap.prototype.peek\",\"peekKey\",\"goog.structs.Heap.prototype.peekKey\",\"getKey\",\"goog.structs.Heap.prototype.moveDown_\",\"index\",\"leftChildIndex\",\"getLeftChildIndex_\",\"rightChildIndex\",\"getRightChildIndex_\",\"smallerChildIndex\",\"goog.structs.Heap.prototype.moveUp_\",\"parentIndex\",\"getParentIndex_\",\"goog.structs.Heap.prototype.getLeftChildIndex_\",\"goog.structs.Heap.prototype.getRightChildIndex_\",\"goog.structs.Heap.prototype.getParentIndex_\",\"goog.structs.Heap.prototype.getValues\",\"rv\",\"l\",\"goog.structs.Heap.prototype.getKeys\",\"containsValue\",\"goog.structs.Heap.prototype.containsValue\",\"val\",\"some\",\"containsKey\",\"goog.structs.Heap.prototype.containsKey\",\"clone\",\"goog.structs.Heap.prototype.clone\",\"goog.structs.Heap.prototype.getCount\",\"isEmpty\",\"goog.structs.Heap.prototype.isEmpty\",\"goog.structs.Heap.prototype.clear\"]\n}\n"]