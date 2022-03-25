/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/
import {arc} from "d3-shape";
import {descending, min} from "d3-array";
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

    this._label = (d, i) => {
      if (d.sourceNode && d.targetNode) {
        return `${this._nodeId(d.sourceNode)} / ${this._nodeId(d.targetNode)}`;
      }
      return this._nodeId(d, i);
    };

    this._links = accessor("links");
    this._linksShapeConfig = {
      Path: {
        fillOpacity: 0.7
      }
    };
    this._linksSource = "source";
    this._linksTarget = "target";
    this._noDataMessage = false;
    this._nodeId = accessor("id");
    this._nodeWidth = 15;
    this._nodes = accessor("nodes");
    
    /*
    this._on.mouseenter = () => {};
    this._on["mouseleave.shape"] = () => {
      this.hover(false);
    };
    const defaultMouseMove = this._on["mousemove.shape"];
    this._on["mousemove.shape"] = (d, i, x, event) => {
      defaultMouseMove(d, i, x, event);
      if (this._focus && this._focus === d.id) {
        this.hover(false);
        this._on.mouseenter.bind(this)(d, i, x, event);

        this._focus = undefined;
      }
      else {
        const id = this._nodeId(d, i),
              node = this._nodeLookup[id],
              nodeLookup = Object.keys(this._nodeLookup).reduce((all, item) => {
                all[this._nodeLookup[item]] = !isNaN(item) ? parseInt(item, 10) : item;
                return all;
              }, {});

        const links = this._linkLookup[node] || [];
        const filterIds = [id];

        links.forEach(l => {
          filterIds.push(nodeLookup[l]);
        });

        const _filtersIds = [...new Set(filterIds)];

        this.hover((h, x) => {
          if (h.source && h.target) {
            return h.source.index === node || h.target.index === node;
          }
          else {
            return _filtersIds.includes(this._nodeId(h, x));
          }
        });
      }
    };*/
    this._padAngle = 0.05;
    this._shapeConfig = assign(this._shapeConfig, {
      Path: {
        label: false,
        strokeOpacity: 0.5,
        strokeWidth: 1
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

    const innerRadius = min([
      this._width - this._margin.left - this._margin.right - 2 * this._nodeWidth,
      this._height - this._margin.top - this._margin.bottom - 2 * this._nodeWidth
    ]) / 2;

    const outerRadius = innerRadius + this._nodeWidth;

    const data = this._filteredData.reduce((obj, d, i) => {
      obj[this._nodeId(d, i)] = d;
      return obj;
    }, {});

    const _nodes = Array.isArray(this._nodes)
      ? this._nodes.sort((a, b) => this._nodeId(a) > this._nodeId(b) ? 1 : -1).reduce((obj, d, i) => {
        obj[this._nodeId(d, i)] = d;
        return obj;
      }, {})
      : this._links.reduce((all, d) => {
        if (!all.includes(d[this._linksSource])) all.push(d[this._linksSource]);
        if (!all.includes(d[this._linksTarget])) all.push(d[this._linksTarget]);
        return all;
      }, []).map(id => ({[this._linksSource]: id})).reduce((obj, d, i) => {
        obj[this._nodeId(d, i)] = d;
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

    this._linkLookup = links.reduce((obj, d) => {
      if (!obj[d.source]) obj[d.source] = [];
      obj[d.source].push(d.target);
      if (!obj[d.target]) obj[d.target] = [];
      obj[d.target].push(d.source);
      return obj;
    }, {});

    const matrix = Array(nodes.length).fill().map(() => Array(nodes.length).fill(0));

    links.map(link => matrix[link.source][link.target] = link.value);

    const _chord = this._chord
      .padAngle(this._padAngle)
      .sortSubgroups(this._sortSubgroups)
      (matrix);

    _chord.forEach(link => {
      if (link.source && link.target) {
        const _sourceData = Array.isArray(this._nodes) ? this._nodes[link.source.index] : nodes[link.source.index].node;
        const _targetData = Array.isArray(this._nodes) ? this._nodes[link.target.index] : nodes[link.target.index].node;

        link.__d3plus__ = true;
        link.data = {
          [this._linksSource]: this._nodeId(_sourceData),
          [this._linksTarget]: this._nodeId(_targetData),
          sourceNode: _sourceData,
          targetNode: _targetData,
          value: link.source.value
        };
        link.i = `${link.source.index}-${link.target.index}`;
      }
    });
    
    const arcData = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const radiusData = ribbon()
      .radius(innerRadius);

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
        .config(configPrep.bind(this)(assign(this._shapeConfig, this._linksShapeConfig), "shape", "Path"))
        .d(radiusData)
        .data(_chord)
        .id(d => `${d.source.index}-${d.target.index}`)
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
      @desc If *value* is specified, sets the config method for each link and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  linksShapeConfig(_) {
    return arguments.length ? (this._linksShapeConfig = assign(this._linksShapeConfig, _), this) : this._linksShapeConfig;
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
