# Force Directed Network

If the array of [nodes](http://d3plus.org/docs/#Network.nodes) provided to a d3plus network visualization do not have pre-defined x and y coordinates, a [d3-force](https://github.com/d3/d3-force) simulation is applied to calculate the coordinates of each node based on the [links](http://d3plus.org/docs/#Network.links) provided. Given lists of nodes and links that look like this:

```js
var nodeArray = [
  {id: "alpha"},
  {id: "beta"},
  {id: "gamma"},
  {id: "epsilon"},
  {id: "zeta"},
  {id: "theta"}
];

var linkArray = [
  {source: 0, target: 1, weight: 10},
  {source: 0, target: 2, weight: 10},
  {source: 3, target: 4, weight: 10},
  {source: 3, target: 5, weight: 5},
  {source: 5, target: 0, weight: 20},
  {source: 2, target: 1, weight: 12},
  {source: 4, target: 5, weight: 12}
];
```

The force-directed layout algorithm can also be improved by provided a link strength, with an accessor provided to the [linkSize](http://d3plus.org/docs/#Network.linkSize) method.

```js
const network = new d3plus.Network()
  .config({
    links: linkArray,
    linkSize: function(d) { return d.weight; },
    nodes: nodeArray
  })
  .render();
```
