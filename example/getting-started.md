# Simple Network

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
