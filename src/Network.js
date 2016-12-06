import {extent, mean, min, merge} from "d3-array";
import {nest} from "d3-collection";
// import {forceSimulation} from "d3-force";
import {event} from "d3-selection";
import * as scales from "d3-scale";
import {zoom} from "d3-zoom";

import {accessor, assign, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {Viz} from "d3plus-viz";

/**
    @class Network
    @extends Viz
    @desc Creates an x/y plot based on an array of data.
*/
export default class Network extends Viz {

  /**
      @memberof Network
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();
    this._links = [];
    this._nodes = [];
    this._sizeMin = 5;
    this._sizeScale = "sqrt";
    this._shape = constant("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      Path: {
        fill: "none",
        label: false,
        stroke: "#eee",
        strokeWidth: 1
      },
      textAnchor: "middle",
      verticalAlign: "middle"
    });
    this._x = accessor("x");
    this._y = accessor("y");

    this._zoom = true;
    this._zoomBehavior = zoom();
    this._zoomBrush = false;
    this._zoomMax = 16;
    this._zoomPan = true;
    this._zoomScroll = true;

  }

  /**
      Handles events dispatched from this._zoomBehavior
      @private
  */
  _zoomed() {
    this._zoomGroup.attr("transform", event.transform);
  }

  /**
      Handles adding/removing zoom event listeners.
      @private
  */
  _zoomEvents() {

    if (this._zoomBrush) {
      // brushGroup.style("display", "inline");
      this._networkGroup.on(".zoom", null);
    }
    else if (this._zoom) {
      // brushGroup.style("display", "none");
      this._networkGroup.call(this._zoomBehavior);
      if (!this._zoomScroll) {
        this._networkGroup
          .on("mousewheel.zoom", null)
          .on("MozMousePixelScroll.zoom", null)
          .on("wheel.zoom", null);
      }
      if (!this._zoomPan) {
        this._networkGroup
          .on("mousedown.zoom", null)
          .on("mousemove.zoom", null)
          .on("touchstart.zoom", null)
          .on("touchmove.zoom", null);
      }
    }
    else {
      this._networkGroup.on(".zoom", null);
    }

  }

  /**
      Extends the render behavior of the abstract Viz class.
      @private
  */
  render(callback) {

    super.render(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          transform = `translate(${this._margin.left}, ${this._margin.top})`,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    const data = this._filteredData.reduce((obj, d, i) => {
      obj[this._id(d, i)] = d;
      return obj;
    }, {});

    let nodes = this._nodes.reduce((obj, d, i) => {
      obj[this._nodeGroupBy ? this._nodeGroupBy[this._drawDepth](d, i) : this._id(d, i)] = d;
      return obj;
    }, {});

    nodes = Array.from(new Set(Object.keys(data).concat(Object.keys(nodes)))).map((id, i) => {

      const d = data[id],
            n = nodes[id];

      return {
        __d3plus__: true,
        data: d || n,
        i, id,
        fx: d !== void 0 && this._x(d) !== void 0 ? this._x(d) : this._x(n),
        fy: d !== void 0 && this._y(d) !== void 0 ? this._y(d) : this._y(n),
        node: n,
        r: this._size ? d !== void 0 && this._size(d) !== void 0 ? this._size(d) : this._size(n) : 1,
        shape: d !== void 0 && this._shape(d) !== void 0 ? this._shape(d) : this._shape(n)
      };

    });

    const xExtent = extent(nodes.map(n => n.fx)),
          yExtent = extent(nodes.map(n => n.fy));

    const x = scales.scaleLinear().domain(xExtent).range([0, width]),
          y = scales.scaleLinear().domain(yExtent).range([0, height]);

    const nodeRatio = (xExtent[1] - xExtent[0]) / (yExtent[1] - yExtent[0]),
          screenRatio = width / height;

    if (nodeRatio > screenRatio) {
      const h = height * screenRatio / nodeRatio;
      y.range([(height - h) / 2, height - (height - h) / 2]);
    }
    else {
      const w = width * nodeRatio / screenRatio;
      x.range([(width - w) / 2, width - (width - w) / 2]);
    }

    nodes.forEach(n => {
      n.x = x(n.fx);
      n.y = y(n.fy);
    });

    const rExtent = extent(nodes.map(n => n.r));
    let rMax = this._sizeMax || min(
          merge(nodes
            .map(n1 => nodes
              .map(n2 => n1 === n2 ? null : shapes.pointDistance(n1, n2))
            )
          )
        ) / 2;

    const r = scales[`scale${this._sizeScale.charAt(0).toUpperCase()}${this._sizeScale.slice(1)}`]()
                .domain(rExtent).range([rExtent[0] === rExtent[1] ? rMax : min([rMax / 2, this._sizeMin]), rMax]),
          xDomain = x.domain(),
          yDomain = y.domain();

    const xOldSize = xDomain[1] - xDomain[0],
          yOldSize = yDomain[1] - yDomain[0];

    nodes.forEach(n => {
      const size = r(n.r);
      if (xDomain[0] > x.invert(n.x - size)) xDomain[0] = x.invert(n.x - size);
      if (xDomain[1] < x.invert(n.x + size)) xDomain[1] = x.invert(n.x + size);
      if (yDomain[0] > y.invert(n.y - size)) yDomain[0] = y.invert(n.y - size);
      if (yDomain[1] < y.invert(n.y + size)) yDomain[1] = y.invert(n.y + size);
    });

    const xNewSize = xDomain[1] - xDomain[0],
          yNewSize = yDomain[1] - yDomain[0];

    rMax *= min([xOldSize / xNewSize, yOldSize / yNewSize]);
    r.range([rExtent[0] === rExtent[1] ? rMax : min([rMax / 2, this._sizeMin]), rMax]);
    x.domain(xDomain);
    y.domain(yDomain);

    nodes.forEach(n => {
      n.x = x(n.fx);
      n.fx = n.x;
      n.y = y(n.fy);
      n.fy = n.y;
      n.r = r(n.r);
      n.width = n.r * 2;
      n.height = n.r * 2;
    });

    const nodeLookup = nodes.reduce((obj, d) => {
      obj[d.id] = d;
      return obj;
    }, {});

    // forceSimulation(nodes)
    //   .on("tick", () => this._shapes.forEach(s => s.render()));

    const nodeIndices = nodes.map(n => n.node);
    const links = this._links.map(l => ({
      source: typeof l.source === "number"
            ? nodes[nodeIndices.indexOf(this._nodes[l.source])]
            : nodeLookup[l.source.id],
      target: typeof l.target === "number"
            ? nodes[nodeIndices.indexOf(this._nodes[l.target])]
            : nodeLookup[l.target.id]
    }));

    this._networkGroup = this._select.selectAll("svg.d3plus-network-svg").data([0]);

    this._networkGroup = this._networkGroup.enter().append("svg")
        .attr("class", "d3plus-network-svg")
        .attr("opacity", 0)
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "transparent")
      .merge(this._networkGroup);

    this._networkGroup.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height);

    const hitArea = this._networkGroup.selectAll("rect.d3plus-network-hitArea").data([0]);
    hitArea.enter().append("rect")
        .attr("class", "d3plus-network-hitArea")
      .merge(hitArea)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent");

    this._zoomGroup = this._networkGroup.selectAll("g.d3plus-network-zoomGroup").data([0]);
    this._zoomGroup = this._zoomGroup.enter().append("g")
        .attr("class", "d3plus-network-zoomGroup")
      .merge(this._zoomGroup);

    // TODO: Brush to Zoom
    // const brushGroup = this._select.selectAll("g.brush").data([0]);
    // brushGroup.enter().append("g").attr("class", "brush");
    //
    // var xBrush = d3.scale.identity().domain([0, width]),
    //     yBrush = d3.scale.identity().domain([0, height]);
    //
    // function brushended(e) {
    //
    //   if (!event.sourceEvent) return;
    //
    //   const extent = brush.extent();
    //   brushGroup.call(brush.clear());
    //
    //   const zs = this._zoomBehavior.scale(), zt = this._zoomBehavior.translate();
    //
    //   const pos1 = extent[0].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //   const pos2 = extent[1].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //
    //   zoomToBounds([pos1, pos2]);
    //
    // }
    //
    // var brush = d3.svg.brush()
    //   .x(xBrush)
    //   .y(yBrush)
    //   .on("brushend", brushended);
    //
    // if (this._zoom) brushGroup.call(brush);

    this._zoomBehavior
      .scaleExtent([1, this._zoomMax])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", this._zoomed.bind(this));

    const parent = this._zoomGroup;

    this._shapes.push(new shapes.Path()
      .config(this._shapeConfig)
      .config(this._shapeConfig.Path)
      .d(d => `M${d.source.x},${d.source.y} ${d.target.x},${d.target.y}`)
      .data(links)
      // .duration(0)
      .select(elem("g.d3plus-network-links", {parent, transition, enter: {transform}, update: {transform}}).node())
      .render());

    const shapeConfig = {
      // duration: 0,
      label: d => this._drawLabel(d.data || d.node, d.i),
      select: elem("g.d3plus-network-nodes", {parent, transition, enter: {transform}, update: {transform}}).node()
    };

    nest().key(d => d.shape).entries(nodes).forEach(d => {
      this._shapes.push(new shapes[d.key]()
        .config(this._shapeConfigPrep(d.key))
        .config(shapeConfig)
        .data(d.values)
        .render());
    });

    this._zoomEvents();

    return this;

  }

  /**
      @memberof Network
      @desc If *links* is specified, sets the links array to the specified array and returns the current class instance. If *links* is not specified, returns the current links array.
      @param {Array} [*links* = []]
  */
  links(_) {
    return arguments.length ? (this._links = _, this) : this._links;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
      @param {String|Function|Array} [*value* = undefined]
  */
  nodeGroupBy(_) {
    if (!arguments.length) return this._nodeGroupBy;
    if (!(_ instanceof Array)) _ = [_];
    return this._nodeGroupBy = _.map(k => {
      if (typeof k === "function") return k;
      else {
        if (!this._aggs[k]) {
          this._aggs[k] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
        return accessor(k);
      }
    }), this;
  }

  /**
      @memberof Network
      @desc If *nodes* is specified, sets the nodes array to the specified array and returns the current class instance. If *nodes* is not specified, returns the current nodes array.
      @param {Array} [*nodes* = []]
  */
  nodes(_) {
    return arguments.length ? (this._nodes = _, this) : this._nodes;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
      @param {Function|String} [*value*]
  */
  size(_) {
    return arguments.length
         ? (this._size = typeof _ === "function" || !_ ? _ : accessor(_), this)
         : this._size;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.
      @param {Number} [*value*]
  */
  sizeMax(_) {
    return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.
      @param {Number} [*value* = 5]
  */
  sizeMin(_) {
    return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.
      @param {String} [*value* = "sqrt"]
  */
  sizeScale(_) {
    return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
  */
  x(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._x = _;
      else {
        this._x = accessor(_);
        if (!this._aggs[_]) this._aggs[_] = a => mean(a);
      }
      return this;
    }
    else return this._x;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
  */
  y(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._y = _;
      else {
        this._y = accessor(_);
        if (!this._aggs[_]) this._aggs[_] = a => mean(a);
      }
      return this;
    }
    else return this._y;
  }

  /**
      @memberof Network
      @desc If *value* is specified, toggles overall zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current overall zooming value.
      @param {Boolean} [*value* = true]
  */
  zoom(_) {
    return arguments.length ? (this._zoom = _, this) : this._zoom;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.
      @param {Number} [*value* = 16]
  */
  zoomMax(_) {
    return arguments.length ? (this._zoomMax = _, this) : this._zoomMax;
  }

  /**
      @memberof Network
      @desc If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.
      @param {Boolean} [*value* = true]
  */
  zoomPan(_) {
    return arguments.length ? (this._zoomPan = _, this) : this._zoomPan;
  }

  /**
      @memberof Network
      @desc If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.
      @param {Boolean} [*value* = true]
  */
  zoomScroll(_) {
    return arguments.length ? (this._zoomScroll = _, this) : this._zoomScroll;
  }

}
