# d3plus-network

[![NPM Release](http://img.shields.io/npm/v/d3plus-network.svg?style=flat)](https://www.npmjs.org/package/d3plus-network) [![Build Status](https://travis-ci.org/d3plus/d3plus-network.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-network) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-network.svg?style=flat)](https://david-dm.org/d3plus/d3plus-network) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) [![1.0 progress](https://img.shields.io/badge/1.0_progress-50%25-orange.svg?style=flat)](https://github.com/d3plus/d3plus-network/projects/1)

Javascript network visualizations built upon d3 modules.

## Installing

If you use NPM, run `npm install d3plus-network --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-network/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-network.v0.4.full.min.js"></script>
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

 * [Simple Sankey Diagram](http://d3plus.org/examples/d3plus-network/sankey-diagram/)<sup> ***New***</sup>
 * [Simple Rings](http://d3plus.org/examples/d3plus-network/simple-rings/)

## API Reference

##### 
* [Network](#Network)
* [Rings](#Rings)
* [Sankey](#Sankey)

---

<a name="Network"></a>
#### **Network** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L16)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz).


* [Network](#Network) ⇐ [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz)
    * [new Network()](#new_Network_new)
    * [.labelCutoff(*value*)](#Network.labelCutoff) ↩︎
    * [.links(*links*, [*formatter*])](#Network.links) ↩︎
    * [.nodeGroupBy([*value*])](#Network.nodeGroupBy) ↩︎
    * [.nodes(*nodes*, [*formatter*])](#Network.nodes) ↩︎
    * [.size([*value*])](#Network.size) ↩︎
    * [.sizeMax([*value*])](#Network.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Network.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Network.sizeScale) ↩︎
    * [.x([*value*])](#Network.x) ↩︎
    * [.y([*value*])](#Network.y) ↩︎


<a name="new_Network_new" href="#new_Network_new">#</a> new **Network**()

Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.





<a name="Network.labelCutoff" href="#Network.labelCutoff">#</a> Network.**labelCutoff**(*value*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L378)

Defines the maximum number of nodes that allow all labels to be shown. When the number of nodes is over this amount, labels will only be shown on hover and click.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.links" href="#Network.links">#</a> Network.**links**(*links*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L394)

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



<a name="Network.nodeGroupBy" href="#Network.nodeGroupBy">#</a> Network.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L411)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodes" href="#Network.nodes">#</a> Network.**nodes**(*nodes*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L437)

The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *nodes* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Network.size" href="#Network.size">#</a> Network.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L454)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMax" href="#Network.sizeMax">#</a> Network.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L464)

If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMin" href="#Network.sizeMin">#</a> Network.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L474)

If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeScale" href="#Network.sizeScale">#</a> Network.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L484)

If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.x" href="#Network.x">#</a> Network.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L494)

If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.y" href="#Network.y">#</a> Network.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L512)

If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


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





<a name="Rings.center" href="#Rings.center">#</a> Rings.**center**(_) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L462)

Sets the center node to be the node with the given id.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.hover" href="#Rings.hover">#</a> Rings.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L472)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.links" href="#Rings.links">#</a> Rings.**links**(*links*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L493)

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



<a name="Rings.nodeGroupBy" href="#Rings.nodeGroupBy">#</a> Rings.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L510)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.nodes" href="#Rings.nodes">#</a> Rings.**nodes**(*nodes*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L536)

The list of nodes to be used for drawing the rings network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *nodes* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Rings.size" href="#Rings.size">#</a> Rings.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L553)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeMax" href="#Rings.sizeMax">#</a> Rings.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L563)

If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeMin" href="#Rings.sizeMin">#</a> Rings.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L573)

If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeScale" href="#Rings.sizeScale">#</a> Rings.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L583)

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
    * [.nodeAlign([*value*])](#Sankey.nodeAlign) ↩︎
    * [.nodeId([*value*])](#Sankey.nodeId) ↩︎
    * [.nodes(*nodes*)](#Sankey.nodes) ↩︎
    * [.nodeWidth([*value*])](#Sankey.nodeWidth) ↩︎
    * [.value(*value*)](#Sankey.value)


<a name="new_Sankey_new" href="#new_Sankey_new">#</a> new **Sankey**()

Creates a sankey visualization based on a defined set of nodes and links. [Click here](http://d3plus.org/examples/d3plus-network/sankey-diagram/) for help getting started using the Sankey class.





<a name="Sankey.hover" href="#Sankey.hover">#</a> Sankey.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L208)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.links" href="#Sankey.links">#</a> Sankey.**links**(*links*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L225)

A predefined *Array* of edges that connect each object passed to the [node](#Sankey.node) method. The `source` and `target` keys in each link need to map to the nodes in one of one way:
1. A *String* value matching the `id` of the node.

The value passed should be an *Array* of data. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeAlign" href="#Sankey.nodeAlign">#</a> Sankey.**nodeAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L242)

Sets the nodeAlign property of the sankey layout, which can either be "left", "right", "center", or "justify".


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeId" href="#Sankey.nodeId">#</a> Sankey.**nodeId**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L254)

If *value* is specified, sets the node id accessor(s) to the specified array of values and returns the current class instance. If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodes" href="#Sankey.nodes">#</a> Sankey.**nodes**(*nodes*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L268)

The list of nodes to be used for drawing the network. The value passed must be an *Array* of data.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeWidth" href="#Sankey.nodeWidth">#</a> Sankey.**nodeWidth**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L285)

If *value* is specified, sets the width of the node and returns the current class instance. If *value* is not specified, returns the current nodeWidth. By default, the nodeWidth size is 30.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.value" href="#Sankey.value">#</a> Sankey.**value**(*value*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L298)

If *value* is specified, sets the width of the links and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Sankey</code>](#Sankey).


```js
function value(d) {
  return d.value;
}
```

---



###### <sub>Documentation generated on Tue, 03 Jul 2018 18:19:56 GMT</sub>
