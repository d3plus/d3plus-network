# Simple Sankey Diagram
Given an array of [nodes](http://d3plus.org/docs/#Sankey.nodes) and an array of [links](http://d3plus.org/docs/#Sankey.links), [d3plus-network](https://github.com/d3plus/d3plus-network) creates a simple sankey visualization.

```js
var nodes = [
  {id: "alpha"},
  {id: "beta"},
  {id: "gamma"},
  {id: "epsilon"},
  {id: "zeta"},
  {id: "theta"}
];
```

The `source` and `target` keys in each link need to map to the nodes to be a *String* value matching the `id` of the node.
```js
var links = [
  {source: "alpha", target: "beta"},
  {source: "alpha", target: "gamma"},
  {source: "epsilon", target: "zeta"},
  {source: "epsilon", target: "theta"},
  {source: "theta", target: "alpha"}
];
```

Finally, these 2 variables simply need to be passed to a new Sankey class:

```js
new d3plus.Sankey()
  .links(links)
  .nodes(nodes)
  .render();
```
