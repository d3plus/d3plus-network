# d3plus-network

[![NPM Release](http://img.shields.io/npm/v/d3plus-network.svg?style=flat)](https://www.npmjs.org/package/d3plus-network) [![Build Status](https://travis-ci.org/d3plus/d3plus-network.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-network) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-network.svg?style=flat)](https://david-dm.org/d3plus/d3plus-network) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat)](https://gitter.im/d3plus/)

Javascript network visualizations built upon d3 modules.

## Installing

If you use NPM, run `npm install d3plus-network --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-network/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-network.v0.1.full.min.js"></script>
```


## Simple Network

Given an array of nodes and an array of links, d3plus-network creates a simple network visualization based on the supplied x and y coordinates.

```js
var nodes = [
  {id: "alpha",   x: 1,   y: 1},
  {id: "beta",    x: 2,   y: 1},
  {id: "gamma",   x: 1,   y: 2},
  {id: "epsilon", x: 3,   y: 2},
  {id: "zeta",    x: 2.5, y: 1.5},
  {id: "theta",   x: 2,   y: 2}
];
```

The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in this example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

```js
var links = [
  {source: 0, target: 1},
  {source: 0, target: 2},
  {source: 3, target: 4},
  {source: 3, target: 5},
  {source: 5, target: 0}
];
```

Finally, these 2 variables simply need to be passed to a new Network class:

```js
new d3plus.Network()
  .links(links)
  .nodes(nodes)
  .render();
```


[<kbd><img src="/example/getting-started.png" width="990px" /></kbd>](https://d3plus.org/examples/d3plus-network/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-network/getting-started/) to view this example live on the web.





## API Reference

##### Classes
* [Network](#Network)

---

<a name="Network"></a>
#### **Network** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L18)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz).


* [Network](#Network) ⇐ [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz)
    * [new Network()](#new_Network_new)
    * [.links([*links*])](#Network.links) ↩︎
    * [.nodeGroupBy([*value*])](#Network.nodeGroupBy) ↩︎
    * [.nodes([*nodes*])](#Network.nodes) ↩︎
    * [.size([*value*])](#Network.size) ↩︎
    * [.sizeMax([*value*])](#Network.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Network.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Network.sizeScale) ↩︎
    * [.x([*value*])](#Network.x) ↩︎
    * [.y([*value*])](#Network.y) ↩︎
    * [.zoom([*value*])](#Network.zoom) ↩︎
    * [.zoomMax([*value*])](#Network.zoomMax) ↩︎
    * [.zoomPan([*value*])](#Network.zoomPan) ↩︎
    * [.zoomScroll([*value*])](#Network.zoomScroll) ↩︎


<a name="new_Network_new" href="#new_Network_new">#</a> new **Network**()

Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.





<a name="Network.links" href="#Network.links">#</a> Network.**links**([*links*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L536)

A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodeGroupBy" href="#Network.nodeGroupBy">#</a> Network.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L546)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodes" href="#Network.nodes">#</a> Network.**nodes**([*nodes*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L569)

If *nodes* is specified, sets the nodes array to the specified array and returns the current class instance. If *nodes* is not specified, returns the current nodes array.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.size" href="#Network.size">#</a> Network.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L579)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMax" href="#Network.sizeMax">#</a> Network.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L589)

If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMin" href="#Network.sizeMin">#</a> Network.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L599)

If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeScale" href="#Network.sizeScale">#</a> Network.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L609)

If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.x" href="#Network.x">#</a> Network.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L619)

If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.y" href="#Network.y">#</a> Network.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L637)

If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoom" href="#Network.zoom">#</a> Network.**zoom**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L655)

If *value* is specified, toggles overall zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current overall zooming value.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoomMax" href="#Network.zoomMax">#</a> Network.**zoomMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L665)

If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoomPan" href="#Network.zoomPan">#</a> Network.**zoomPan**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L675)

If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoomScroll" href="#Network.zoomScroll">#</a> Network.**zoomScroll**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L685)

If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Thu, 20 Jul 2017 12:19:40 GMT</sub>
