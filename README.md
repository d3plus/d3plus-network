# d3plus-network

[![NPM Release](http://img.shields.io/npm/v/d3plus-network.svg?style=flat)](https://www.npmjs.org/package/d3plus-network)
[![Build Status](https://travis-ci.org/d3plus/d3plus-network.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-network)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-network.svg?style=flat)](https://david-dm.org/d3plus/d3plus-network)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

Javascript network visualizations built upon d3 modules.

## Installing

If you use NPM, `npm install d3plus-network`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-network/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-network.v0.1.full.min.js"></script>
```


## Getting Started

Given an array of nodes and an array of links, d3plus-network can create simple network visualization based on supplied x and y coordinates.

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
<a name="Network"></a>

### Network ⇐ <code>[Viz](https://github.com/d3plus/d3plus-viz#Viz)</code>
**Kind**: global class  
**Extends**: <code>[Viz](https://github.com/d3plus/d3plus-viz#Viz)</code>  

* [Network](#Network) ⇐ <code>[Viz](https://github.com/d3plus/d3plus-viz#Viz)</code>
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

<a name="new_Network_new"></a>

#### new Network()
Creates an x/y plot based on an array of data.

<a name="Network.links"></a>

#### Network.links([*links*]) ↩︎
If *links* is specified, sets the links array to the specified array and returns the current class instance. If *links* is not specified, returns the current links array.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*links*] | <code>Array</code> | <code>[]</code> | 

<a name="Network.nodeGroupBy"></a>

#### Network.nodeGroupBy([*value*]) ↩︎
If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>String</code> \| <code>function</code> \| <code>Array</code> | 

<a name="Network.nodes"></a>

#### Network.nodes([*nodes*]) ↩︎
If *nodes* is specified, sets the nodes array to the specified array and returns the current class instance. If *nodes* is not specified, returns the current nodes array.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*nodes*] | <code>Array</code> | <code>[]</code> | 

<a name="Network.size"></a>

#### Network.size([*value*]) ↩︎
If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>String</code> | 

<a name="Network.sizeMax"></a>

#### Network.sizeMax([*value*]) ↩︎
If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> | 

<a name="Network.sizeMin"></a>

#### Network.sizeMin([*value*]) ↩︎
If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="Network.sizeScale"></a>

#### Network.sizeScale([*value*]) ↩︎
If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;sqrt&quot;</code> | 

<a name="Network.x"></a>

#### Network.x([*value*]) ↩︎
If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>String</code> | 

<a name="Network.y"></a>

#### Network.y([*value*]) ↩︎
If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>String</code> | 

<a name="Network.zoom"></a>

#### Network.zoom([*value*]) ↩︎
If *value* is specified, toggles overall zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current overall zooming value.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>true</code> | 

<a name="Network.zoomMax"></a>

#### Network.zoomMax([*value*]) ↩︎
If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>16</code> | 

<a name="Network.zoomPan"></a>

#### Network.zoomPan([*value*]) ↩︎
If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>true</code> | 

<a name="Network.zoomScroll"></a>

#### Network.zoomScroll([*value*]) ↩︎
If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.

**Kind**: static method of <code>[Network](#Network)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>true</code> | 



###### <sub>Documentation generated on Wed, 29 Mar 2017 00:11:41 GMT</sub>
