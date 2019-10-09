["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/math/box.js"],"~:js","goog.provide(\"goog.math.Box\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.math.Coordinate\");\n/**\n * @struct\n * @constructor\n * @param {number} top\n * @param {number} right\n * @param {number} bottom\n * @param {number} left\n */\ngoog.math.Box = function(top, right, bottom, left) {\n  /** @type {number} */ this.top = top;\n  /** @type {number} */ this.right = right;\n  /** @type {number} */ this.bottom = bottom;\n  /** @type {number} */ this.left = left;\n};\n/**\n * @param {...goog.math.Coordinate} var_args\n * @return {!goog.math.Box}\n */\ngoog.math.Box.boundingBox = function(var_args) {\n  var box = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);\n  for (var i = 1; i < arguments.length; i++) {\n    box.expandToIncludeCoordinate(arguments[i]);\n  }\n  return box;\n};\n/**\n * @return {number}\n */\ngoog.math.Box.prototype.getWidth = function() {\n  return this.right - this.left;\n};\n/**\n * @return {number}\n */\ngoog.math.Box.prototype.getHeight = function() {\n  return this.bottom - this.top;\n};\n/**\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.clone = function() {\n  return new goog.math.Box(this.top, this.right, this.bottom, this.left);\n};\nif (goog.DEBUG) {\n  /**\n   * @return {string}\n   * @override\n   */\n  goog.math.Box.prototype.toString = function() {\n    return \"(\" + this.top + \"t, \" + this.right + \"r, \" + this.bottom + \"b, \" + this.left + \"l)\";\n  };\n}\n/**\n * @param {(goog.math.Coordinate|goog.math.Box)} other\n * @return {boolean}\n */\ngoog.math.Box.prototype.contains = function(other) {\n  return goog.math.Box.contains(this, other);\n};\n/**\n * @param {(number|goog.math.Box)} top\n * @param {number=} opt_right\n * @param {number=} opt_bottom\n * @param {number=} opt_left\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.expand = function(top, opt_right, opt_bottom, opt_left) {\n  if (goog.isObject(top)) {\n    this.top -= top.top;\n    this.right += top.right;\n    this.bottom += top.bottom;\n    this.left -= top.left;\n  } else {\n    this.top -= /** @type {number} */ (top);\n    this.right += Number(opt_right);\n    this.bottom += Number(opt_bottom);\n    this.left -= Number(opt_left);\n  }\n  return this;\n};\n/**\n * @param {goog.math.Box} box\n */\ngoog.math.Box.prototype.expandToInclude = function(box) {\n  this.left = Math.min(this.left, box.left);\n  this.top = Math.min(this.top, box.top);\n  this.right = Math.max(this.right, box.right);\n  this.bottom = Math.max(this.bottom, box.bottom);\n};\n/**\n * @param {!goog.math.Coordinate} coord\n */\ngoog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {\n  this.top = Math.min(this.top, coord.y);\n  this.right = Math.max(this.right, coord.x);\n  this.bottom = Math.max(this.bottom, coord.y);\n  this.left = Math.min(this.left, coord.x);\n};\n/**\n * @param {goog.math.Box} a\n * @param {goog.math.Box} b\n * @return {boolean}\n */\ngoog.math.Box.equals = function(a, b) {\n  if (a == b) {\n    return true;\n  }\n  if (!a || !b) {\n    return false;\n  }\n  return a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left;\n};\n/**\n * @param {goog.math.Box} box\n * @param {(goog.math.Coordinate|goog.math.Box)} other\n * @return {boolean}\n */\ngoog.math.Box.contains = function(box, other) {\n  if (!box || !other) {\n    return false;\n  }\n  if (other instanceof goog.math.Box) {\n    return other.left >= box.left && other.right <= box.right && other.top >= box.top && other.bottom <= box.bottom;\n  }\n  return other.x >= box.left && other.x <= box.right && other.y >= box.top && other.y <= box.bottom;\n};\n/**\n * @param {goog.math.Box} box\n * @param {goog.math.Coordinate} coord\n * @return {number}\n */\ngoog.math.Box.relativePositionX = function(box, coord) {\n  if (coord.x < box.left) {\n    return coord.x - box.left;\n  } else {\n    if (coord.x > box.right) {\n      return coord.x - box.right;\n    }\n  }\n  return 0;\n};\n/**\n * @param {goog.math.Box} box\n * @param {goog.math.Coordinate} coord\n * @return {number}\n */\ngoog.math.Box.relativePositionY = function(box, coord) {\n  if (coord.y < box.top) {\n    return coord.y - box.top;\n  } else {\n    if (coord.y > box.bottom) {\n      return coord.y - box.bottom;\n    }\n  }\n  return 0;\n};\n/**\n * @param {goog.math.Box} box\n * @param {goog.math.Coordinate} coord\n * @return {number}\n */\ngoog.math.Box.distance = function(box, coord) {\n  var x = goog.math.Box.relativePositionX(box, coord);\n  var y = goog.math.Box.relativePositionY(box, coord);\n  return Math.sqrt(x * x + y * y);\n};\n/**\n * @param {goog.math.Box} a\n * @param {goog.math.Box} b\n * @return {boolean}\n */\ngoog.math.Box.intersects = function(a, b) {\n  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;\n};\n/**\n * @param {goog.math.Box} a\n * @param {goog.math.Box} b\n * @param {number} padding\n * @return {boolean}\n */\ngoog.math.Box.intersectsWithPadding = function(a, b, padding) {\n  return a.left <= b.right + padding && b.left <= a.right + padding && a.top <= b.bottom + padding && b.top <= a.bottom + padding;\n};\n/**\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.ceil = function() {\n  this.top = Math.ceil(this.top);\n  this.right = Math.ceil(this.right);\n  this.bottom = Math.ceil(this.bottom);\n  this.left = Math.ceil(this.left);\n  return this;\n};\n/**\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.floor = function() {\n  this.top = Math.floor(this.top);\n  this.right = Math.floor(this.right);\n  this.bottom = Math.floor(this.bottom);\n  this.left = Math.floor(this.left);\n  return this;\n};\n/**\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.round = function() {\n  this.top = Math.round(this.top);\n  this.right = Math.round(this.right);\n  this.bottom = Math.round(this.bottom);\n  this.left = Math.round(this.left);\n  return this;\n};\n/**\n * @param {(number|goog.math.Coordinate)} tx\n * @param {number=} opt_ty\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.translate = function(tx, opt_ty) {\n  if (tx instanceof goog.math.Coordinate) {\n    this.left += tx.x;\n    this.right += tx.x;\n    this.top += tx.y;\n    this.bottom += tx.y;\n  } else {\n    goog.asserts.assertNumber(tx);\n    this.left += tx;\n    this.right += tx;\n    if (goog.isNumber(opt_ty)) {\n      this.top += opt_ty;\n      this.bottom += opt_ty;\n    }\n  }\n  return this;\n};\n/**\n * @param {number} sx\n * @param {number=} opt_sy\n * @return {!goog.math.Box}\n */\ngoog.math.Box.prototype.scale = function(sx, opt_sy) {\n  var sy = goog.isNumber(opt_sy) ? opt_sy : sx;\n  this.left *= sx;\n  this.right *= sx;\n  this.top *= sy;\n  this.bottom *= sy;\n  return this;\n};\n","~:source","// Copyright 2006 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview A utility class for representing a numeric box.\n */\n\n\ngoog.provide('goog.math.Box');\n\ngoog.require('goog.asserts');\ngoog.require('goog.math.Coordinate');\n\n\n\n/**\n * Class for representing a box. A box is specified as a top, right, bottom,\n * and left. A box is useful for representing margins and padding.\n *\n * This class assumes 'screen coordinates': larger Y coordinates are further\n * from the top of the screen.\n *\n * @param {number} top Top.\n * @param {number} right Right.\n * @param {number} bottom Bottom.\n * @param {number} left Left.\n * @struct\n * @constructor\n */\ngoog.math.Box = function(top, right, bottom, left) {\n  /**\n   * Top\n   * @type {number}\n   */\n  this.top = top;\n\n  /**\n   * Right\n   * @type {number}\n   */\n  this.right = right;\n\n  /**\n   * Bottom\n   * @type {number}\n   */\n  this.bottom = bottom;\n\n  /**\n   * Left\n   * @type {number}\n   */\n  this.left = left;\n};\n\n\n/**\n * Creates a Box by bounding a collection of goog.math.Coordinate objects\n * @param {...goog.math.Coordinate} var_args Coordinates to be included inside\n *     the box.\n * @return {!goog.math.Box} A Box containing all the specified Coordinates.\n */\ngoog.math.Box.boundingBox = function(var_args) {\n  var box = new goog.math.Box(\n      arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);\n  for (var i = 1; i < arguments.length; i++) {\n    box.expandToIncludeCoordinate(arguments[i]);\n  }\n  return box;\n};\n\n\n/**\n * @return {number} width The width of this Box.\n */\ngoog.math.Box.prototype.getWidth = function() {\n  return this.right - this.left;\n};\n\n\n/**\n * @return {number} height The height of this Box.\n */\ngoog.math.Box.prototype.getHeight = function() {\n  return this.bottom - this.top;\n};\n\n\n/**\n * Creates a copy of the box with the same dimensions.\n * @return {!goog.math.Box} A clone of this Box.\n */\ngoog.math.Box.prototype.clone = function() {\n  return new goog.math.Box(this.top, this.right, this.bottom, this.left);\n};\n\n\nif (goog.DEBUG) {\n  /**\n   * Returns a nice string representing the box.\n   * @return {string} In the form (50t, 73r, 24b, 13l).\n   * @override\n   */\n  goog.math.Box.prototype.toString = function() {\n    return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' +\n        this.left + 'l)';\n  };\n}\n\n\n/**\n * Returns whether the box contains a coordinate or another box.\n *\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\n * @return {boolean} Whether the box contains the coordinate or other box.\n */\ngoog.math.Box.prototype.contains = function(other) {\n  return goog.math.Box.contains(this, other);\n};\n\n\n/**\n * Expands box with the given margins.\n *\n * @param {number|goog.math.Box} top Top margin or box with all margins.\n * @param {number=} opt_right Right margin.\n * @param {number=} opt_bottom Bottom margin.\n * @param {number=} opt_left Left margin.\n * @return {!goog.math.Box} A reference to this Box.\n */\ngoog.math.Box.prototype.expand = function(\n    top, opt_right, opt_bottom, opt_left) {\n  if (goog.isObject(top)) {\n    this.top -= top.top;\n    this.right += top.right;\n    this.bottom += top.bottom;\n    this.left -= top.left;\n  } else {\n    this.top -= /** @type {number} */ (top);\n    this.right += Number(opt_right);\n    this.bottom += Number(opt_bottom);\n    this.left -= Number(opt_left);\n  }\n\n  return this;\n};\n\n\n/**\n * Expand this box to include another box.\n * NOTE(user): This is used in code that needs to be very fast, please don't\n * add functionality to this function at the expense of speed (variable\n * arguments, accepting multiple argument types, etc).\n * @param {goog.math.Box} box The box to include in this one.\n */\ngoog.math.Box.prototype.expandToInclude = function(box) {\n  this.left = Math.min(this.left, box.left);\n  this.top = Math.min(this.top, box.top);\n  this.right = Math.max(this.right, box.right);\n  this.bottom = Math.max(this.bottom, box.bottom);\n};\n\n\n/**\n * Expand this box to include the coordinate.\n * @param {!goog.math.Coordinate} coord The coordinate to be included\n *     inside the box.\n */\ngoog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {\n  this.top = Math.min(this.top, coord.y);\n  this.right = Math.max(this.right, coord.x);\n  this.bottom = Math.max(this.bottom, coord.y);\n  this.left = Math.min(this.left, coord.x);\n};\n\n\n/**\n * Compares boxes for equality.\n * @param {goog.math.Box} a A Box.\n * @param {goog.math.Box} b A Box.\n * @return {boolean} True iff the boxes are equal, or if both are null.\n */\ngoog.math.Box.equals = function(a, b) {\n  if (a == b) {\n    return true;\n  }\n  if (!a || !b) {\n    return false;\n  }\n  return a.top == b.top && a.right == b.right && a.bottom == b.bottom &&\n      a.left == b.left;\n};\n\n\n/**\n * Returns whether a box contains a coordinate or another box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\n * @return {boolean} Whether the box contains the coordinate or other box.\n */\ngoog.math.Box.contains = function(box, other) {\n  if (!box || !other) {\n    return false;\n  }\n\n  if (other instanceof goog.math.Box) {\n    return other.left >= box.left && other.right <= box.right &&\n        other.top >= box.top && other.bottom <= box.bottom;\n  }\n\n  // other is a Coordinate.\n  return other.x >= box.left && other.x <= box.right && other.y >= box.top &&\n      other.y <= box.bottom;\n};\n\n\n/**\n * Returns the relative x position of a coordinate compared to a box.  Returns\n * zero if the coordinate is inside the box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate} coord A Coordinate.\n * @return {number} The x position of `coord` relative to the nearest\n *     side of `box`, or zero if `coord` is inside `box`.\n */\ngoog.math.Box.relativePositionX = function(box, coord) {\n  if (coord.x < box.left) {\n    return coord.x - box.left;\n  } else if (coord.x > box.right) {\n    return coord.x - box.right;\n  }\n  return 0;\n};\n\n\n/**\n * Returns the relative y position of a coordinate compared to a box.  Returns\n * zero if the coordinate is inside the box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate} coord A Coordinate.\n * @return {number} The y position of `coord` relative to the nearest\n *     side of `box`, or zero if `coord` is inside `box`.\n */\ngoog.math.Box.relativePositionY = function(box, coord) {\n  if (coord.y < box.top) {\n    return coord.y - box.top;\n  } else if (coord.y > box.bottom) {\n    return coord.y - box.bottom;\n  }\n  return 0;\n};\n\n\n/**\n * Returns the distance between a coordinate and the nearest corner/side of a\n * box. Returns zero if the coordinate is inside the box.\n *\n * @param {goog.math.Box} box A Box.\n * @param {goog.math.Coordinate} coord A Coordinate.\n * @return {number} The distance between `coord` and the nearest\n *     corner/side of `box`, or zero if `coord` is inside\n *     `box`.\n */\ngoog.math.Box.distance = function(box, coord) {\n  var x = goog.math.Box.relativePositionX(box, coord);\n  var y = goog.math.Box.relativePositionY(box, coord);\n  return Math.sqrt(x * x + y * y);\n};\n\n\n/**\n * Returns whether two boxes intersect.\n *\n * @param {goog.math.Box} a A Box.\n * @param {goog.math.Box} b A second Box.\n * @return {boolean} Whether the boxes intersect.\n */\ngoog.math.Box.intersects = function(a, b) {\n  return (\n      a.left <= b.right && b.left <= a.right && a.top <= b.bottom &&\n      b.top <= a.bottom);\n};\n\n\n/**\n * Returns whether two boxes would intersect with additional padding.\n *\n * @param {goog.math.Box} a A Box.\n * @param {goog.math.Box} b A second Box.\n * @param {number} padding The additional padding.\n * @return {boolean} Whether the boxes intersect.\n */\ngoog.math.Box.intersectsWithPadding = function(a, b, padding) {\n  return (\n      a.left <= b.right + padding && b.left <= a.right + padding &&\n      a.top <= b.bottom + padding && b.top <= a.bottom + padding);\n};\n\n\n/**\n * Rounds the fields to the next larger integer values.\n *\n * @return {!goog.math.Box} This box with ceil'd fields.\n */\ngoog.math.Box.prototype.ceil = function() {\n  this.top = Math.ceil(this.top);\n  this.right = Math.ceil(this.right);\n  this.bottom = Math.ceil(this.bottom);\n  this.left = Math.ceil(this.left);\n  return this;\n};\n\n\n/**\n * Rounds the fields to the next smaller integer values.\n *\n * @return {!goog.math.Box} This box with floored fields.\n */\ngoog.math.Box.prototype.floor = function() {\n  this.top = Math.floor(this.top);\n  this.right = Math.floor(this.right);\n  this.bottom = Math.floor(this.bottom);\n  this.left = Math.floor(this.left);\n  return this;\n};\n\n\n/**\n * Rounds the fields to nearest integer values.\n *\n * @return {!goog.math.Box} This box with rounded fields.\n */\ngoog.math.Box.prototype.round = function() {\n  this.top = Math.round(this.top);\n  this.right = Math.round(this.right);\n  this.bottom = Math.round(this.bottom);\n  this.left = Math.round(this.left);\n  return this;\n};\n\n\n/**\n * Translates this box by the given offsets. If a `goog.math.Coordinate`\n * is given, then the left and right values are translated by the coordinate's\n * x value and the top and bottom values are translated by the coordinate's y\n * value.  Otherwise, `tx` and `opt_ty` are used to translate the x\n * and y dimension values.\n *\n * @param {number|goog.math.Coordinate} tx The value to translate the x\n *     dimension values by or the the coordinate to translate this box by.\n * @param {number=} opt_ty The value to translate y dimension values by.\n * @return {!goog.math.Box} This box after translating.\n */\ngoog.math.Box.prototype.translate = function(tx, opt_ty) {\n  if (tx instanceof goog.math.Coordinate) {\n    this.left += tx.x;\n    this.right += tx.x;\n    this.top += tx.y;\n    this.bottom += tx.y;\n  } else {\n    goog.asserts.assertNumber(tx);\n    this.left += tx;\n    this.right += tx;\n    if (goog.isNumber(opt_ty)) {\n      this.top += opt_ty;\n      this.bottom += opt_ty;\n    }\n  }\n  return this;\n};\n\n\n/**\n * Scales this coordinate by the given scale factors. The x and y dimension\n * values are scaled by `sx` and `opt_sy` respectively.\n * If `opt_sy` is not given, then `sx` is used for both x and y.\n *\n * @param {number} sx The scale factor to use for the x dimension.\n * @param {number=} opt_sy The scale factor to use for the y dimension.\n * @return {!goog.math.Box} This box after scaling.\n */\ngoog.math.Box.prototype.scale = function(sx, opt_sy) {\n  var sy = goog.isNumber(opt_sy) ? opt_sy : sx;\n  this.left *= sx;\n  this.right *= sx;\n  this.top *= sy;\n  this.bottom *= sy;\n  return this;\n};\n","~:compiled-at",1567452991334,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.math.box.js\",\n\"lineCount\":252,\n\"mappings\":\"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\",\n\"sources\":[\"goog/math/box.js\"],\n\"sourcesContent\":[\"// Copyright 2006 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview A utility class for representing a numeric box.\\n */\\n\\n\\ngoog.provide('goog.math.Box');\\n\\ngoog.require('goog.asserts');\\ngoog.require('goog.math.Coordinate');\\n\\n\\n\\n/**\\n * Class for representing a box. A box is specified as a top, right, bottom,\\n * and left. A box is useful for representing margins and padding.\\n *\\n * This class assumes 'screen coordinates': larger Y coordinates are further\\n * from the top of the screen.\\n *\\n * @param {number} top Top.\\n * @param {number} right Right.\\n * @param {number} bottom Bottom.\\n * @param {number} left Left.\\n * @struct\\n * @constructor\\n */\\ngoog.math.Box = function(top, right, bottom, left) {\\n  /**\\n   * Top\\n   * @type {number}\\n   */\\n  this.top = top;\\n\\n  /**\\n   * Right\\n   * @type {number}\\n   */\\n  this.right = right;\\n\\n  /**\\n   * Bottom\\n   * @type {number}\\n   */\\n  this.bottom = bottom;\\n\\n  /**\\n   * Left\\n   * @type {number}\\n   */\\n  this.left = left;\\n};\\n\\n\\n/**\\n * Creates a Box by bounding a collection of goog.math.Coordinate objects\\n * @param {...goog.math.Coordinate} var_args Coordinates to be included inside\\n *     the box.\\n * @return {!goog.math.Box} A Box containing all the specified Coordinates.\\n */\\ngoog.math.Box.boundingBox = function(var_args) {\\n  var box = new goog.math.Box(\\n      arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x);\\n  for (var i = 1; i < arguments.length; i++) {\\n    box.expandToIncludeCoordinate(arguments[i]);\\n  }\\n  return box;\\n};\\n\\n\\n/**\\n * @return {number} width The width of this Box.\\n */\\ngoog.math.Box.prototype.getWidth = function() {\\n  return this.right - this.left;\\n};\\n\\n\\n/**\\n * @return {number} height The height of this Box.\\n */\\ngoog.math.Box.prototype.getHeight = function() {\\n  return this.bottom - this.top;\\n};\\n\\n\\n/**\\n * Creates a copy of the box with the same dimensions.\\n * @return {!goog.math.Box} A clone of this Box.\\n */\\ngoog.math.Box.prototype.clone = function() {\\n  return new goog.math.Box(this.top, this.right, this.bottom, this.left);\\n};\\n\\n\\nif (goog.DEBUG) {\\n  /**\\n   * Returns a nice string representing the box.\\n   * @return {string} In the form (50t, 73r, 24b, 13l).\\n   * @override\\n   */\\n  goog.math.Box.prototype.toString = function() {\\n    return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' +\\n        this.left + 'l)';\\n  };\\n}\\n\\n\\n/**\\n * Returns whether the box contains a coordinate or another box.\\n *\\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\\n * @return {boolean} Whether the box contains the coordinate or other box.\\n */\\ngoog.math.Box.prototype.contains = function(other) {\\n  return goog.math.Box.contains(this, other);\\n};\\n\\n\\n/**\\n * Expands box with the given margins.\\n *\\n * @param {number|goog.math.Box} top Top margin or box with all margins.\\n * @param {number=} opt_right Right margin.\\n * @param {number=} opt_bottom Bottom margin.\\n * @param {number=} opt_left Left margin.\\n * @return {!goog.math.Box} A reference to this Box.\\n */\\ngoog.math.Box.prototype.expand = function(\\n    top, opt_right, opt_bottom, opt_left) {\\n  if (goog.isObject(top)) {\\n    this.top -= top.top;\\n    this.right += top.right;\\n    this.bottom += top.bottom;\\n    this.left -= top.left;\\n  } else {\\n    this.top -= /** @type {number} */ (top);\\n    this.right += Number(opt_right);\\n    this.bottom += Number(opt_bottom);\\n    this.left -= Number(opt_left);\\n  }\\n\\n  return this;\\n};\\n\\n\\n/**\\n * Expand this box to include another box.\\n * NOTE(user): This is used in code that needs to be very fast, please don't\\n * add functionality to this function at the expense of speed (variable\\n * arguments, accepting multiple argument types, etc).\\n * @param {goog.math.Box} box The box to include in this one.\\n */\\ngoog.math.Box.prototype.expandToInclude = function(box) {\\n  this.left = Math.min(this.left, box.left);\\n  this.top = Math.min(this.top, box.top);\\n  this.right = Math.max(this.right, box.right);\\n  this.bottom = Math.max(this.bottom, box.bottom);\\n};\\n\\n\\n/**\\n * Expand this box to include the coordinate.\\n * @param {!goog.math.Coordinate} coord The coordinate to be included\\n *     inside the box.\\n */\\ngoog.math.Box.prototype.expandToIncludeCoordinate = function(coord) {\\n  this.top = Math.min(this.top, coord.y);\\n  this.right = Math.max(this.right, coord.x);\\n  this.bottom = Math.max(this.bottom, coord.y);\\n  this.left = Math.min(this.left, coord.x);\\n};\\n\\n\\n/**\\n * Compares boxes for equality.\\n * @param {goog.math.Box} a A Box.\\n * @param {goog.math.Box} b A Box.\\n * @return {boolean} True iff the boxes are equal, or if both are null.\\n */\\ngoog.math.Box.equals = function(a, b) {\\n  if (a == b) {\\n    return true;\\n  }\\n  if (!a || !b) {\\n    return false;\\n  }\\n  return a.top == b.top && a.right == b.right && a.bottom == b.bottom &&\\n      a.left == b.left;\\n};\\n\\n\\n/**\\n * Returns whether a box contains a coordinate or another box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate|goog.math.Box} other A Coordinate or a Box.\\n * @return {boolean} Whether the box contains the coordinate or other box.\\n */\\ngoog.math.Box.contains = function(box, other) {\\n  if (!box || !other) {\\n    return false;\\n  }\\n\\n  if (other instanceof goog.math.Box) {\\n    return other.left >= box.left && other.right <= box.right &&\\n        other.top >= box.top && other.bottom <= box.bottom;\\n  }\\n\\n  // other is a Coordinate.\\n  return other.x >= box.left && other.x <= box.right && other.y >= box.top &&\\n      other.y <= box.bottom;\\n};\\n\\n\\n/**\\n * Returns the relative x position of a coordinate compared to a box.  Returns\\n * zero if the coordinate is inside the box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate} coord A Coordinate.\\n * @return {number} The x position of `coord` relative to the nearest\\n *     side of `box`, or zero if `coord` is inside `box`.\\n */\\ngoog.math.Box.relativePositionX = function(box, coord) {\\n  if (coord.x < box.left) {\\n    return coord.x - box.left;\\n  } else if (coord.x > box.right) {\\n    return coord.x - box.right;\\n  }\\n  return 0;\\n};\\n\\n\\n/**\\n * Returns the relative y position of a coordinate compared to a box.  Returns\\n * zero if the coordinate is inside the box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate} coord A Coordinate.\\n * @return {number} The y position of `coord` relative to the nearest\\n *     side of `box`, or zero if `coord` is inside `box`.\\n */\\ngoog.math.Box.relativePositionY = function(box, coord) {\\n  if (coord.y < box.top) {\\n    return coord.y - box.top;\\n  } else if (coord.y > box.bottom) {\\n    return coord.y - box.bottom;\\n  }\\n  return 0;\\n};\\n\\n\\n/**\\n * Returns the distance between a coordinate and the nearest corner/side of a\\n * box. Returns zero if the coordinate is inside the box.\\n *\\n * @param {goog.math.Box} box A Box.\\n * @param {goog.math.Coordinate} coord A Coordinate.\\n * @return {number} The distance between `coord` and the nearest\\n *     corner/side of `box`, or zero if `coord` is inside\\n *     `box`.\\n */\\ngoog.math.Box.distance = function(box, coord) {\\n  var x = goog.math.Box.relativePositionX(box, coord);\\n  var y = goog.math.Box.relativePositionY(box, coord);\\n  return Math.sqrt(x * x + y * y);\\n};\\n\\n\\n/**\\n * Returns whether two boxes intersect.\\n *\\n * @param {goog.math.Box} a A Box.\\n * @param {goog.math.Box} b A second Box.\\n * @return {boolean} Whether the boxes intersect.\\n */\\ngoog.math.Box.intersects = function(a, b) {\\n  return (\\n      a.left <= b.right && b.left <= a.right && a.top <= b.bottom &&\\n      b.top <= a.bottom);\\n};\\n\\n\\n/**\\n * Returns whether two boxes would intersect with additional padding.\\n *\\n * @param {goog.math.Box} a A Box.\\n * @param {goog.math.Box} b A second Box.\\n * @param {number} padding The additional padding.\\n * @return {boolean} Whether the boxes intersect.\\n */\\ngoog.math.Box.intersectsWithPadding = function(a, b, padding) {\\n  return (\\n      a.left <= b.right + padding && b.left <= a.right + padding &&\\n      a.top <= b.bottom + padding && b.top <= a.bottom + padding);\\n};\\n\\n\\n/**\\n * Rounds the fields to the next larger integer values.\\n *\\n * @return {!goog.math.Box} This box with ceil'd fields.\\n */\\ngoog.math.Box.prototype.ceil = function() {\\n  this.top = Math.ceil(this.top);\\n  this.right = Math.ceil(this.right);\\n  this.bottom = Math.ceil(this.bottom);\\n  this.left = Math.ceil(this.left);\\n  return this;\\n};\\n\\n\\n/**\\n * Rounds the fields to the next smaller integer values.\\n *\\n * @return {!goog.math.Box} This box with floored fields.\\n */\\ngoog.math.Box.prototype.floor = function() {\\n  this.top = Math.floor(this.top);\\n  this.right = Math.floor(this.right);\\n  this.bottom = Math.floor(this.bottom);\\n  this.left = Math.floor(this.left);\\n  return this;\\n};\\n\\n\\n/**\\n * Rounds the fields to nearest integer values.\\n *\\n * @return {!goog.math.Box} This box with rounded fields.\\n */\\ngoog.math.Box.prototype.round = function() {\\n  this.top = Math.round(this.top);\\n  this.right = Math.round(this.right);\\n  this.bottom = Math.round(this.bottom);\\n  this.left = Math.round(this.left);\\n  return this;\\n};\\n\\n\\n/**\\n * Translates this box by the given offsets. If a `goog.math.Coordinate`\\n * is given, then the left and right values are translated by the coordinate's\\n * x value and the top and bottom values are translated by the coordinate's y\\n * value.  Otherwise, `tx` and `opt_ty` are used to translate the x\\n * and y dimension values.\\n *\\n * @param {number|goog.math.Coordinate} tx The value to translate the x\\n *     dimension values by or the the coordinate to translate this box by.\\n * @param {number=} opt_ty The value to translate y dimension values by.\\n * @return {!goog.math.Box} This box after translating.\\n */\\ngoog.math.Box.prototype.translate = function(tx, opt_ty) {\\n  if (tx instanceof goog.math.Coordinate) {\\n    this.left += tx.x;\\n    this.right += tx.x;\\n    this.top += tx.y;\\n    this.bottom += tx.y;\\n  } else {\\n    goog.asserts.assertNumber(tx);\\n    this.left += tx;\\n    this.right += tx;\\n    if (goog.isNumber(opt_ty)) {\\n      this.top += opt_ty;\\n      this.bottom += opt_ty;\\n    }\\n  }\\n  return this;\\n};\\n\\n\\n/**\\n * Scales this coordinate by the given scale factors. The x and y dimension\\n * values are scaled by `sx` and `opt_sy` respectively.\\n * If `opt_sy` is not given, then `sx` is used for both x and y.\\n *\\n * @param {number} sx The scale factor to use for the x dimension.\\n * @param {number=} opt_sy The scale factor to use for the y dimension.\\n * @return {!goog.math.Box} This box after scaling.\\n */\\ngoog.math.Box.prototype.scale = function(sx, opt_sy) {\\n  var sy = goog.isNumber(opt_sy) ? opt_sy : sx;\\n  this.left *= sx;\\n  this.right *= sx;\\n  this.top *= sy;\\n  this.bottom *= sy;\\n  return this;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"math\",\"Box\",\"goog.math.Box\",\"top\",\"right\",\"bottom\",\"left\",\"boundingBox\",\"goog.math.Box.boundingBox\",\"var_args\",\"box\",\"arguments\",\"y\",\"x\",\"i\",\"length\",\"expandToIncludeCoordinate\",\"prototype\",\"getWidth\",\"goog.math.Box.prototype.getWidth\",\"getHeight\",\"goog.math.Box.prototype.getHeight\",\"clone\",\"goog.math.Box.prototype.clone\",\"DEBUG\",\"toString\",\"goog.math.Box.prototype.toString\",\"contains\",\"goog.math.Box.prototype.contains\",\"other\",\"expand\",\"goog.math.Box.prototype.expand\",\"opt_right\",\"opt_bottom\",\"opt_left\",\"isObject\",\"Number\",\"expandToInclude\",\"goog.math.Box.prototype.expandToInclude\",\"Math\",\"min\",\"max\",\"goog.math.Box.prototype.expandToIncludeCoordinate\",\"coord\",\"equals\",\"goog.math.Box.equals\",\"a\",\"b\",\"goog.math.Box.contains\",\"relativePositionX\",\"goog.math.Box.relativePositionX\",\"relativePositionY\",\"goog.math.Box.relativePositionY\",\"distance\",\"goog.math.Box.distance\",\"sqrt\",\"intersects\",\"goog.math.Box.intersects\",\"intersectsWithPadding\",\"goog.math.Box.intersectsWithPadding\",\"padding\",\"ceil\",\"goog.math.Box.prototype.ceil\",\"floor\",\"goog.math.Box.prototype.floor\",\"round\",\"goog.math.Box.prototype.round\",\"translate\",\"goog.math.Box.prototype.translate\",\"tx\",\"opt_ty\",\"Coordinate\",\"asserts\",\"assertNumber\",\"isNumber\",\"scale\",\"goog.math.Box.prototype.scale\",\"sx\",\"opt_sy\",\"sy\"]\n}\n"]