# Simple Sankey Diagram

Given an *Array* of [nodes](http://d3plus.org/docs/#Sankey.nodes) and an *Array* of [links](http://d3plus.org/docs/#Sankey.links), [d3plus-network](https://github.com/d3plus/d3plus-network) can create a Sankey visualization using the [Sankey](http://d3plus.org/docs/#Sankey) class.

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

The `source` and `target` keys in each link need to *String* values matching the `id` of the associated node.

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
