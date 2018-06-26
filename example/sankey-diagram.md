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

```js
var links = [
  {source: "alpha", target: "beta"},
  {source: "alpha", target: "gamma"},
  {source: "epsilon", target: "zeta"},
  {source: "epsilon", target: "theta"},
  {source: "theta", target: "alpha"}
];
```

Finally, these 2 variables simply need to be passed to a new Network class:

```js
new d3plus.Sankey()
  .links(links)
  .nodes(nodes)
  .render();
```
