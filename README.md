# d3plus-network

[![NPM Release](http://img.shields.io/npm/v/d3plus-network.svg?style=flat)](https://www.npmjs.org/package/d3plus-network) [![Build Status](https://travis-ci.org/d3plus/d3plus-network.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-network) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-network.svg?style=flat)](https://david-dm.org/d3plus/d3plus-network) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/)

Javascript network visualizations built upon d3 modules.

## Installing

If you use NPM, `npm install d3plus-network`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-network/releases/latest). You can also load d3plus-network as a standalone library or as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-network@1"></script>
<script>
  console.log(d3plus);
</script>
```


## Simple Network Graph

Given an array of [nodes](http://d3plus.org/docs/#Network.nodes) and an array of [links](http://d3plus.org/docs/#Network.links), [d3plus-network](https://github.com/d3plus/d3plus-network) creates a simple network visualization based on the supplied x and y coordinates.

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


### More Examples

 * [Simple Rings](http://d3plus.org/examples/d3plus-network/simple-rings/)
 * [Simple Sankey Diagram](http://d3plus.org/examples/d3plus-network/sankey-diagram/)
 * [Force Directed Network](http://d3plus.org/examples/d3plus-network/force-network/)

## API Reference

##### 
* [Network](#Network)
* [Rings](#Rings)
* [Sankey](#Sankey)

---

<a name="Network"></a>
#### **Network** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L25)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz).


* [Network](#Network) ⇐ [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz)
    * [new Network()](#new_Network_new)
    * [.hover([*value*])](#Network.hover) ↩︎
    * [.links(*links*, [*formatter*])](#Network.links) ↩︎
    * [.linkSize([*value*])](#Network.linkSize) ↩︎
    * [.linkSizeMin([*value*])](#Network.linkSizeMin) ↩︎
    * [.linkSizeScale([*value*])](#Network.linkSizeScale) ↩︎
    * [.nodeGroupBy([*value*])](#Network.nodeGroupBy) ↩︎
    * [.nodes(*nodes*, [*formatter*])](#Network.nodes) ↩︎
    * [.size([*value*])](#Network.size) ↩︎
    * [.sizeMax([*value*])](#Network.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Network.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Network.sizeScale) ↩︎
    * [.x([*value*])](#Network.x) ↩︎
    * [.y([*value*])](#Network.y) ↩︎
    * [.linkSize([*value*])](#Network.linkSize) ↩︎
    * [.linkSizeMin([*value*])](#Network.linkSizeMin) ↩︎
    * [.linkSizeScale([*value*])](#Network.linkSizeScale) ↩︎


<a name="new_Network_new" href="#new_Network_new">#</a> new **Network**()

Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.





<a name="Network.hover" href="#Network.hover">#</a> Network.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L489)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.links" href="#Network.links">#</a> Network.**links**(*links*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L512)

A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *links* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Network.linkSize" href="#Network.linkSize">#</a> Network.**linkSize**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L526)

Defines the thickness of the links connecting each node. The value provided can be either a pixel Number to be used for all links, or an accessor function that returns a specific data value to be used in an automatically calculated linear scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeMin" href="#Network.linkSizeMin">#</a> Network.**linkSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L536)

Defines the minimum pixel stroke width used in link sizing.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeScale" href="#Network.linkSizeScale">#</a> Network.**linkSizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L546)

Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of links in the network.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodeGroupBy" href="#Network.nodeGroupBy">#</a> Network.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L556)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodes" href="#Network.nodes">#</a> Network.**nodes**(*nodes*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L582)

The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *nodes* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Network.size" href="#Network.size">#</a> Network.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L596)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMax" href="#Network.sizeMax">#</a> Network.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L606)

Defines the maximum pixel radius used in size scaling. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMin" href="#Network.sizeMin">#</a> Network.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L616)

Defines the minimum pixel radius used in size scaling.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeScale" href="#Network.sizeScale">#</a> Network.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L626)

Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of nodes in the network.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.x" href="#Network.x">#</a> Network.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L636)

If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.y" href="#Network.y">#</a> Network.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L654)

If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSize" href="#Network.linkSize">#</a> Network.**linkSize**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L531)

Defines the thickness of the links connecting each node. The value provided can be either a pixel Number to be used for all links, or an accessor function that returns a specific data value to be used in an automatically calculated linear scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeMin" href="#Network.linkSizeMin">#</a> Network.**linkSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L541)

Defines the minimum pixel stroke width used in link sizing.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeScale" href="#Network.linkSizeScale">#</a> Network.**linkSizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L551)

Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of links in the network.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

---

<a name="Rings"></a>
#### **Rings** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L15)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz).


* [Rings](#Rings) ⇐ [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz)
    * [new Rings()](#new_Rings_new)
    * [.center(_)](#Rings.center) ↩︎
    * [.hover([*value*])](#Rings.hover) ↩︎
    * [.links(*links*, [*formatter*])](#Rings.links) ↩︎
    * [.nodeGroupBy([*value*])](#Rings.nodeGroupBy) ↩︎
    * [.nodes(*nodes*, [*formatter*])](#Rings.nodes) ↩︎
    * [.size([*value*])](#Rings.size) ↩︎
    * [.sizeMax([*value*])](#Rings.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Rings.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Rings.sizeScale) ↩︎


<a name="new_Rings_new" href="#new_Rings_new">#</a> new **Rings**()

Creates a ring visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/simple-rings/) for help getting started using the Rings class.





<a name="Rings.center" href="#Rings.center">#</a> Rings.**center**(_) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L486)

Sets the center node to be the node with the given id.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.hover" href="#Rings.hover">#</a> Rings.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L496)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.links" href="#Rings.links">#</a> Rings.**links**(*links*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L517)

A predefined *Array* of edges that connect each object passed to the [node](#Rings.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *links* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Rings.nodeGroupBy" href="#Rings.nodeGroupBy">#</a> Rings.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L561)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.nodes" href="#Rings.nodes">#</a> Rings.**nodes**(*nodes*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L587)

The list of nodes to be used for drawing the rings network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *nodes* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Rings.size" href="#Rings.size">#</a> Rings.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L601)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeMax" href="#Rings.sizeMax">#</a> Rings.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L611)

If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeMin" href="#Rings.sizeMin">#</a> Rings.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L621)

If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeScale" href="#Rings.sizeScale">#</a> Rings.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L631)

If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

---

<a name="Sankey"></a>
#### **Sankey** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L27)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz).


* [Sankey](#Sankey) ⇐ [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz)
    * [new Sankey()](#new_Sankey_new)
    * [.hover([*value*])](#Sankey.hover) ↩︎
    * [.links(*links*)](#Sankey.links) ↩︎
    * [.linksSource([*value*])](#Sankey.linksSource) ↩︎
    * [.linksTarget([*value*])](#Sankey.linksTarget) ↩︎
    * [.nodeAlign([*value*])](#Sankey.nodeAlign) ↩︎
    * [.nodeId([*value*])](#Sankey.nodeId) ↩︎
    * [.nodes(*nodes*)](#Sankey.nodes) ↩︎
    * [.nodePadding([*value*])](#Sankey.nodePadding) ↩︎
    * [.nodeWidth([*value*])](#Sankey.nodeWidth) ↩︎
    * [.value(*value*)](#Sankey.value)


<a name="new_Sankey_new" href="#new_Sankey_new">#</a> new **Sankey**()

Creates a sankey visualization based on a defined set of nodes and links. [Click here](http://d3plus.org/examples/d3plus-network/sankey-diagram/) for help getting started using the Sankey class.





<a name="Sankey.hover" href="#Sankey.hover">#</a> Sankey.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L217)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.links" href="#Sankey.links">#</a> Sankey.**links**(*links*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L234)

A predefined *Array* of edges that connect each object passed to the [node](#Sankey.node) method. The `source` and `target` keys in each link need to map to the nodes in one of one way:
1. A *String* value matching the `id` of the node.

The value passed should be an *Array* of data. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.linksSource" href="#Sankey.linksSource">#</a> Sankey.**linksSource**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L248)

The key inside of each link Object that references the source node.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.linksTarget" href="#Sankey.linksTarget">#</a> Sankey.**linksTarget**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L258)

The key inside of each link Object that references the target node.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeAlign" href="#Sankey.nodeAlign">#</a> Sankey.**nodeAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L268)

Sets the nodeAlign property of the sankey layout, which can either be "left", "right", "center", or "justify".


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeId" href="#Sankey.nodeId">#</a> Sankey.**nodeId**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L280)

If *value* is specified, sets the node id accessor(s) to the specified array of values and returns the current class instance. If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodes" href="#Sankey.nodes">#</a> Sankey.**nodes**(*nodes*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L294)

The list of nodes to be used for drawing the network. The value passed must be an *Array* of data.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodePadding" href="#Sankey.nodePadding">#</a> Sankey.**nodePadding**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L308)

If *value* is specified, sets the padding of the node and returns the current class instance. If *value* is not specified, returns the current nodePadding. By default, the nodePadding size is 8.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeWidth" href="#Sankey.nodeWidth">#</a> Sankey.**nodeWidth**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L319)

If *value* is specified, sets the width of the node and returns the current class instance. If *value* is not specified, returns the current nodeWidth. By default, the nodeWidth size is 30.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.value" href="#Sankey.value">#</a> Sankey.**value**(*value*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L332)

If *value* is specified, sets the width of the links and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Sankey</code>](#Sankey).


```js
function value(d) {
  return d.value;
}
```

---



###### <sub>Documentation generated on Wed, 16 Jun 2021 15:51:51 GMT</sub>
