/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/
import {arc} from "d3-shape";
import {descending} from "d3-array";
import {chord, ribbon} from "d3-chord";

import {accessor, assign, configPrep, constant, elem} from "d3plus-common";
import {Path} from "d3plus-shape";
import {addToQueue, Viz} from "d3plus-viz";

/**
    @class Chord
    @extends external:Viz
    @desc Creates a chord visualization based on a defined set of nodes and edges.
*/

export default class Chord extends Viz {

  /**
    @memberof Chord
    @desc Invoked when creating a new class instance, and sets any default parameters.
    @private
  */

  constructor() {
    super();
    this._chord = chord();
    this._links = accessor("links");
    this._linksSource = "source";
    this._linksTarget = "target";
    this._noDataMessage = false;
    this._nodeId = accessor("id");
    this._nodes = accessor("nodes");
    this._innerRadius = 200;
    this._outerRadius = 210;
    this._padAngle = 0.05;
    this._radius = 200;
    this._shapeConfig = assign(this._shapeConfig, {
      Path: {
        label: false,
        strokeOpacity: 0.5,
        strokeWidth: 0.5
      }
    });
    this._sortSubgroups = descending();
    this._value = constant(1);
  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */

  _draw(callback) {
    
    super._draw(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    const data = this._filteredData.reduce((obj, d, i) => {
      obj[this._id(d, i)] = d;
      return obj;
    }, {});

    const _nodes = Array.isArray(this._nodes)
      ? this._nodes.reduce((obj, d, i) => {
        obj[this._id(d, i)] = d;
        return obj;
      }, {})
      : this._links.reduce((all, d) => {
        if (!all.includes(d[this._linksSource])) all.push(d[this._linksSource]);
        if (!all.includes(d[this._linksTarget])) all.push(d[this._linksTarget]);
        return all;
      }, []).map(id => ({id})).reduce((obj, d, i) => {
        obj[this._id(d, i)] = d;
        return obj;
      }, {});

    const nodes = Array.from(new Set(Object.keys(data).concat(_nodes))).map((id, i) => {
      const d = data[id],
            n = _nodes[id];

      if (n === undefined) return false;

      return {
        __d3plus__: true,
        data: d || n,
        i, id,
        node: n,
        shape: "Path"
      };
    }).filter(n => n);

    const nodeLookup = this._nodeLookup = nodes.reduce((obj, d, i) => {
      obj[d.id] = i;
      return obj;
    }, {});

    const links = this._links.map((link, i) => {
      const check = [this._linksSource, this._linksTarget];
      const linkLookup = check.reduce((result, item) => {
        result[item] = nodeLookup[link[item]];
        return result;
      }, {});
      return {
        source: linkLookup[this._linksSource],
        target: linkLookup[this._linksTarget],
        value: this._value(link, i)
      };
    });

    const matrix = Array(nodes.length).fill().map(() => Array(nodes.length).fill(0));

    links.map(link => matrix[link.source][link.target] = link.value);

    const _chord = this._chord
      .padAngle(this._padAngle)
      .sortSubgroups(this._sortSubgroups)
      (matrix);

    const arcData = arc()
      .innerRadius(this._innerRadius)
      .outerRadius(this._outerRadius);

    const radiusData = ribbon()
      .radius(this._radius);

    const transform = `translate(${width / 2 + this._margin.left}, ${height / 2 + this._margin.top})`;

    this._shapes.push(
      new Path()
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .d(arcData)
        .data(_chord.groups.map(d => Object.assign(d, nodes[d.index])))
        .id(d => d.index)
        .select(
          elem("g.d3plus-chord-nodes", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .render()
    );

    this._shapes.push(
      new Path()
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .d(radiusData)
        .data(_chord)
        .id(d => `${d.source.index}_${d.target.index}`) 
        .select(
          elem("g.d3plus-chord-links", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .render()
    );

    return this;
  }
  
  /**
      @memberof Chord
      @desc A predefined *Array* of edges that connect each object passed to the node method. The `source` and `target` keys in each link need to map to the nodes in one of one way:
1. A *String* value matching the `id` of the node.

The value passed should be an *Array* of data. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
      @param {Array} *links* = []
      @chainable
  */
  links(_, f) {
    if (arguments.length) {
      addToQueue.bind(this)(_, f, "links");
      return this;
    }
    return this._links;
  }
    
  /**
      @memberof Chord
      @desc The key inside of each link Object that references the source node.
      @param {String} [*value* = "source"]
      @chainable
  */
  linksSource(_) {
    return arguments.length ? (this._linksSource = _, this) : this._linksSource;
  }

  /**
      @memberof Chord
      @desc The key inside of each link Object that references the target node.
      @param {String} [*value* = "target"]
      @chainable
  */
  linksTarget(_) {
    return arguments.length ? (this._linksTarget = _, this) : this._linksTarget;
  }

  /**
      @memberof Chord
      @desc If *value* is specified, sets the node id accessor(s) to the specified array of values and returns the current class instance. If *value* is not specified, returns the current node group accessor.
      @param {String} [*value* = "id"]
      @chainable
  */
  nodeId(_) {
    return arguments.length
      ? (this._nodeId = typeof _ === "function" ? _ : accessor(_), this)
      : this._nodeId;
  }

  /**
      @memberof Chord
      @desc The list of nodes to be used for drawing the chord diagram. The value passed must be an *Array* of data.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
      @param {Array} *nodes* = []
      @chainable
  */
  nodes(_, f) {
    if (arguments.length) {
      addToQueue.bind(this)(_, f, "nodes");
      return this;
    }
    return this._nodes;
  }

  /**
      @memberof Chord
      @desc If *value* is specified, sets the width of the links and returns the current class instance. If *value* is not specified, returns the current value accessor.
      @param {Function|Number} *value*
      @example
function value(d) {
  return d.value;
}
  */
  value(_) {
    return arguments.length
      ? (this._value = typeof _ === "function" ? _ : accessor(_), this)
      : this._value;
  }
}
