# Simple Rings

Rings is a way to view network connections focused on 1 node in the network. It displays primary and secondary connections of a specific node, and allows the user to click on a node to recenter the visualization on that selected node. The [nodes](http://d3plus.org/docs/#Rings.nodes) and [links](http://d3plus.org/docs/#Rings.links) work just as they do in the [d3plus-network](https://github.com/d3plus/d3plus-network) visualization. 


```js
var links = [
    {"source": "alpha", "target": "beta"},
    {"source": "alpha", "target": "gamma"},
    {"source": "beta", "target": "delta"},
    {"source": "beta", "target": "epsilon"},
    {"source": "zeta", "target": "gamma"},
    {"source": "theta", "target": "gamma"},
    {"source": "eta", "target": "gamma"}
  ];

  new d3plus.Rings()
    .links(links)
    .label(d => d.id)
    .noDataMessage(false)
    .center("alpha")
    .render();
```
