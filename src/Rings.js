/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/

import {extent, max, mean, min, merge} from "d3-array";
import {nest} from "d3-collection";
import * as scales from "d3-scale";
import {zoomTransform} from "d3-zoom";

import {accessor, assign, configPrep, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {dataLoad as load, Viz} from "d3plus-viz";
import {textWrap} from "d3plus-text";

/**
    @class Rings
    @extends external:Viz
    @desc
*/
export default class Rings extends Viz {

  /**
      @memberof Rings
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();
    this._labelCutoff = 100;
    this._links = [];
    this._noDataMessage = false;
    this._nodes = [];
    this._on["mouseleave.shape"] = () => {
      this.active(false);
    };
    this._on["mousemove.shape"] = (d, i) => {
      if (this._hover && this._drawDepth >= this._groupBy.length - 1) {
        if (this._focus && this._focus === d.id) {

          this.active(false);
          this._on.mouseenter.bind(this)(d, i);

          this._focus = undefined;
          this._zoomToBounds(null);

        }
        else {

          this.hover(false);

          const id = this._nodeGroupBy && this._nodeGroupBy[this._drawDepth](d, i) ? this._nodeGroupBy[this._drawDepth](d, i) : this._id(d, i),
                links = this._linkLookup[id],
                node = this._nodeLookup[id];

          const filterIds = [node.id];
          const xDomain = [node.x - node.r, node.x + node.r],
                yDomain = [node.y - node.r, node.y + node.r];

          links.forEach(l => {
            filterIds.push(l.id);
            if (l.x - l.r < xDomain[0]) xDomain[0] = l.x - l.r;
            if (l.x + l.r > xDomain[1]) xDomain[1] = l.x + l.r;
            if (l.y - l.r < yDomain[0]) yDomain[0] = l.y - l.r;
            if (l.y + l.r > yDomain[1]) yDomain[1] = l.y + l.r;
          });

          this.active((h, x) => {
            if (h.source && h.target) return h.source.id === node.id || h.target.id === node.id;
            else return filterIds.includes(this._ids(h, x)[this._drawDepth]);
          });

          this._focus = d.id;

        }

      }
    };
    this._on["click.shape"] = d => {
      this._center = d.id;
      this._draw();
    };
    this._on["click.legend"] = (d, i) => {

      const ids = this._id(d);
      let id = this._ids(d);
      id = id[id.length - 1];

      if (this._hover && this._drawDepth >= this._groupBy.length - 1) {

        if (this._focus && this._focus === ids) {

          this.active(false);
          this._on.mouseenter.bind(this)(d, i);

          this._focus = undefined;
          this._zoomToBounds(null);

        }
        else {

          this.hover(false);

          const nodes = ids.map(id => this._nodeLookup[id]);

          const filterIds = [id];
          let xDomain = [nodes[0].x - nodes[0].r, nodes[0].x + nodes[0].r],
              yDomain = [nodes[0].y - nodes[0].r, nodes[0].y + nodes[0].r];

          nodes.forEach(l => {
            filterIds.push(l.id);
            if (l.x - l.r < xDomain[0]) xDomain[0] = l.x - l.r;
            if (l.x + l.r > xDomain[1]) xDomain[1] = l.x + l.r;
            if (l.y - l.r < yDomain[0]) yDomain[0] = l.y - l.r;
            if (l.y + l.r > yDomain[1]) yDomain[1] = l.y + l.r;
          });

          this.active((h, x) => {
            if (h.source && h.target) return filterIds.includes(h.source.id) && filterIds.includes(h.target.id);
            else {
              const myIds = this._ids(h, x);
              return filterIds.includes(myIds[myIds.length - 1]);
            }
          });

          this._focus = ids;
          const t = zoomTransform(this._container.node());
          xDomain = xDomain.map(d => d * t.k + t.x);
          yDomain = yDomain.map(d => d * t.k + t.y);
          this._zoomToBounds([[xDomain[0], yDomain[0]], [xDomain[1], yDomain[1]]]);

        }

        this._on["mousemove.legend"].bind(this)(d, i);

      }

    };
    this._sizeMin = 5;
    this._sizeScale = "sqrt";
    this._shape = constant("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      labelConfig: {
        duration: 0,
        fontMin: 1,
        fontResize: true,
        labelPadding: 0,
        textAnchor: "middle",
        verticalAlign: "middle"
      },
      Path: {
        fill: "none",
        label: false,
        stroke: "#eee",
        strokeWidth: 1
      }
    });
    this._x = accessor("x");
    this._y = accessor("y");

    this._zoom = true;

  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {

    super._draw(callback);

    const data = this._filteredData.reduce((obj, d, i) => {
      obj[this._id(d, i)] = d;
      return obj;
    }, {});

    if (!this._nodes.length && this._links.length) {
      const nodeIds = Array.from(new Set(this._links.reduce((ids, link) => ids.concat([link.source, link.target]), [])));
      this._nodes = nodeIds.map(node => typeof node === "object" ? node : {id: node});
    }

    let nodes = this._nodes.reduce((obj, d, i) => {
      obj[this._nodeGroupBy ? this._nodeGroupBy[this._drawDepth](d, i) : this._id(d, i)] = d;
      return obj;
    }, {});

    nodes = Array.from(new Set(Object.keys(data).concat(Object.keys(nodes)))).map((id, i) => {

      const d = data[id],
            n = nodes[id];

      if (n === undefined) return false;

      return {
        __d3plus__: true,
        data: d || n,
        i, id,
        fx: d !== undefined && this._x(d) !== undefined ? this._x(d) : this._x(n),
        fy: d !== undefined && this._y(d) !== undefined ? this._y(d) : this._y(n),
        node: n,
        r: this._size ? d !== undefined && this._size(d) !== undefined ? this._size(d) : this._size(n) : this._sizeMin,
        shape: d !== undefined && this._shape(d) !== undefined ? this._shape(d) : this._shape(n)
      };

    }).filter(n => n);

    let nodeLookup = this._nodeLookup = nodes.reduce((obj, d) => {
      obj[d.id] = d;
      return obj;
    }, {});

    this._links = this._links.map(link => {
      const check = ["source", "target"];
      return check.reduce((result, check) => {
        const type = typeof link[check];
        let val;
        if (type === "number") {
          val = nodes[link[check]];
        }
        else if (type === "string") {
          val = nodeLookup[link[check]];
        }
        else {
          val = link[check];
        }
        result[check] = val;
        return result;
      }, {});
    });

    const linkMap = this._links.reduce((map, link) => {
      if (!map[link.source.id]) {
        map[link.source.id] = [];
      }
      map[link.source.id].push(link);
      if (!map[link.target.id]) {
        map[link.target.id] = [];
      }
      map[link.target.id].push(link);
      return map;
    }, {});

    const height = this._height - this._margin.top - this._margin.bottom,
          transform = `translate(${this._margin.left}, ${this._margin.top})`,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    const radius = min([height, width]) / 2,
          ringWidth = radius / 3,
          primaryRing = ringWidth,
          secondaryRing = ringWidth * 2,
          edges = [];


    let center = data[this._center];

    if (!center) {
      center = nodeLookup[this._center];
    }
    
    center.x = width / 2;
    center.y = height / 2;
    center.r = primaryRing * .65;

    const primaries = [],
          claimed = [this._center];

    linkMap[this._center].forEach(edge => {
      const node = edge.source.id === this._center ? edge.target : edge.source;
      node.edges = linkMap[node.id].filter(link => link.source.id !== this._center || link.target.id !== this._center);
      node.edge = edge;

      claimed.push(node.id);
      primaries.push(node);
    });

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Sort primary nodes by children (smallest to largest) and then by sort
    // order.
    // --------------------------------------------------------------------------
    primaries.sort((a, b) => a.edges.length - b.edges.length);

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Check for similar children and give preference to nodes with less
    // overall children.
    // ----------------------------------------------------------------------------
    const secondaries = [];
    let total = 0;

    primaries.forEach(p => {
      const primaryId = p.id;

      p.edges = p.edges.filter(edge => !claimed.includes(edge.source.id) && edge.target.id === primaryId ||
                                       !claimed.includes(edge.target.id) && edge.source.id === primaryId);

      total += p.edges.length || 1;

      p.edges.forEach(edge => {
        const {source, target} = edge;
        const claim = target.id === primaryId ? source : target;
        claimed.push(claim.id);
      });
    });

    const radian = Math.PI * 2;
    let offset = 0, start = 0;

    primaries.forEach((p, i) => {
      const children = p.edges.length || 1;
      const space = radian / total * children;

      if (i === 0) {
        start = angle;
        offset -= space / 2;
      }

      let angle = offset + space / 2;

      angle -= radian / 4;

      p.radians = angle;
      p.x = width / 2 + primaryRing * Math.cos(angle);
      p.y = height / 2 + primaryRing * Math.sin(angle);

      offset += space;

      p.edges.forEach((edge, i) => {
        const node = edge.source.id === p.id ? edge.target : edge.source;
        const s = radian / total;
        const a = angle - s * children / 2 + s / 2 + s * i;

        node.radians = a;
        node.x = width / 2 + secondaryRing * Math.cos(a);
        node.y = height / 2 + secondaryRing * Math.sin(a);
        
        secondaries.push(node);
      });
    });

    const primaryDistance = ringWidth / 2;
    const secondaryDistance = ringWidth / 4;

    let primaryMax = primaryDistance / 2 - 4;
    if (primaryDistance / 2 - 4 < 8) {
      primaryMax = min([primaryDistance / 2, 8]);
    }

    let secondaryMax = secondaryDistance / 2 - 4;
    if (secondaryDistance / 2 - 4 < 4) {
      secondaryMax = min([secondaryDistance / 2, 4]);
    }

    if (secondaryMax > ringWidth / 10) {
      secondaryMax = ringWidth / 10;
    }

    if (secondaryMax > primaryMax && secondaryMax > 10) {
      secondaryMax = primaryMax * .75;
    }
    if (primaryMax > secondaryMax * 1.5) {
      primaryMax = secondaryMax * 1.5;
    }

    primaryMax = Math.floor(primaryMax);
    secondaryMax = Math.floor(secondaryMax);

    let radiusFn;

    if (this._size) {
      const domain = extent(data, d => d.size);

      if (domain[0] === domain[1]) {
        domain[0] = 0;
      }

      radiusFn = scales.scaleLinear()
        .domain(domain)
        .rangeRound([3, min([primaryMax, secondaryMax])]);

      const val = center.size;
      center.r = radiusFn(val);
    }
    else {
      radiusFn = scales.scaleLinear()
        .domain([1, 2])
        .rangeRound([primaryMax, secondaryMax]);
    }

    secondaries.forEach(s => {
      s.ring = 2;
      const val = this._size ? s.size : 2;
      s.r = radiusFn(val);
    });

    primaries.forEach(p => {
      p.ring = 1;
      const val = this._size ? p.size : 1;
      p.r = radiusFn(val);
    });

    nodes = [center].concat(primaries).concat(secondaries);

    primaries.forEach(p => {
      const check = ["source", "target"];
      const {edge} = p;

      check.forEach(node => {
        edge[node] = nodes.find(n => n.id === edge[node].id);
      });

      edges.push(edge);

      linkMap[p.id].forEach(edge => {
        const node = edge.source.id === p.id ? edge.target : edge.source;

        if (node.id !== center.id) {
          let target = secondaries.find(s => s.id === node.id);

          if (!target) {
            target = primaries.find(s => s.id === node.id);
          }

          if (target) {
            edge.spline = true;

            edge.sourceX = edge.source.x + Math.cos(edge.source.ring === 2 ? edge.source.radians + Math.PI : edge.source.radians) * edge.source.r;
            edge.sourceY = edge.source.y + Math.sin(edge.source.ring === 2 ? edge.source.radians + Math.PI : edge.source.radians) * edge.source.r;
            edge.targetX = edge.target.x + Math.cos(edge.target.ring === 2 ? edge.target.radians + Math.PI : edge.target.radians) * edge.target.r;
            edge.targetY = edge.target.y + Math.sin(edge.target.ring === 2 ? edge.target.radians + Math.PI : edge.target.radians) * edge.target.r;

            const centerX = width / 2;
            const centerY = height / 2;
            const middleRing = (secondaryRing + primaryRing) / 1.75;

            edge.sourceBisectX = centerX + middleRing * Math.cos(edge.source.radians);
            edge.sourceBisectY = centerY + middleRing * Math.sin(edge.source.radians);
            edge.targetBisectX = centerX + middleRing * Math.cos(edge.target.radians);
            edge.targetBisectY = centerY + middleRing * Math.sin(edge.target.radians);

            const check = ["source", "target"];

            check.forEach((node, i) => {
              edge[node] = nodes.find(n => n.id === edge[node].id);

              if (edge[node].edges === undefined) edge[node].edges = {};

              const oppId = i === 0 ? edge.target.id : edge.source.id;

              if (edge[node].id === p.id) {
                edge[node].edges[oppId] = {
                  angle: p.radians + Math.PI,
                  radius: ringWidth / 2
                };
              }
              else {
                edge[node].edges[oppId] = {
                  angle: target.radians,
                  radius: ringWidth / 2
                };
              }
            });

            edges.push(edge);
          }
        }
      });
    });

    nodes.forEach(node => {

      if (node.id !== this._center) {
        node.rotate = node.radians * (180 / Math.PI);

        const fontSize = 11;

        const wrap = textWrap()
          .fontSize(fontSize);

        const res = wrap(this._drawLabel(node));
        const containerWidth = max(res.widths) * 2;
        const containerHeight = res.lines.length * 1.4 * fontSize * 2;
        const width = containerWidth / 2;
        const height = containerHeight / 2;
        const padding = 15;

        let angle = node.rotate;
        let anchor, buffer;
        let yOffset = 0;

        if (Math.round(angle) === 90 || Math.round(angle) === -90) {
          const xVal = Math.cos(node.radians + Math.PI) * (node.r + padding);
          const yVal = Math.sin(node.radians + Math.PI) * (node.r + padding);

          buffer = angle < 0 ? -width - xVal + (height / 6) : -width - xVal - (height / 6);
          yOffset = -node.r - yVal;
          anchor = "end";
        }
        else if (angle < -90 || angle > 90) {
          const xVal = Math.cos(node.radians + Math.PI) * (node.r + padding);
          const yVal = Math.sin(node.radians + Math.PI) * (node.r + padding);

          yOffset = -node.r - yVal;
          buffer = -width - xVal;
          angle -= 180;
          anchor = "start";
        }
        else {
          const xVal = Math.cos(node.radians + Math.PI) * (node.r + padding);
          const yVal = Math.sin(node.radians + Math.PI) * (node.r + padding);

          buffer = -width - xVal;
          yOffset = -node.r - yVal;
          anchor = "end";
        }

        node.labelBounds = {
          x: buffer,
          y: yOffset,
          width: containerWidth,
          height: containerHeight
        };

        node.rotate = angle;
        node.fontColor = "#000";
        node.fontSize = fontSize;
        node.textAnchor = anchor;
      }
      else {
        node.labelBounds = {
          x: -primaryRing / 2,
          y: -primaryRing / 2,
          width: primaryRing,
          height: primaryRing
        };
      }
    });

    const nodeIndices = nodes.map(n => n.node);
    const links = this._links.map(l => ({
      source: typeof l.source === "number"
        ? nodes[nodeIndices.indexOf(this._nodes[l.source])]
        : nodeLookup[l.source.id || l.source],
      target: typeof l.target === "number"
        ? nodes[nodeIndices.indexOf(this._nodes[l.target])]
        : nodeLookup[l.target.id || l.target]
    }));

    this._linkLookup = links.reduce((obj, d) => {
      if (!obj[d.source.id]) obj[d.source.id] = [];
      obj[d.source.id].push(d.target);
      if (!obj[d.target.id]) obj[d.target.id] = [];
      obj[d.target.id].push(d.source);
      return obj;
    }, {});

    nodeLookup = this._nodeLookup = nodes.reduce((obj, d) => {
      obj[d.id] = d;
      return obj;
    }, {});

    this._container = this._select.selectAll("svg.d3plus-network").data([0]);

    this._container = this._container.enter().append("svg")
        .attr("class", "d3plus-network")
        .attr("opacity", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("x", this._margin.left)
        .attr("y", this._margin.top)
        .style("background-color", "transparent")
      .merge(this._container);

    this._container.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top);

    const hitArea = this._container.selectAll("rect.d3plus-network-hitArea").data([0]);
    hitArea.enter().append("rect")
        .attr("class", "d3plus-network-hitArea")
      .merge(hitArea)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent")
        .on("click", () => {
          if (this._focus) {
            this.active(false);
            this._focus = undefined;
            this._zoomToBounds(null);
          }
        });

    this._zoomGroup = this._container.selectAll("g.d3plus-network-zoomGroup").data([0]);
    const parent = this._zoomGroup = this._zoomGroup.enter().append("g")
        .attr("class", "d3plus-network-zoomGroup")
      .merge(this._zoomGroup);
    
    this._shapes.push(new shapes.Path()
      .config(this._shapeConfig)
      .config(this._shapeConfig.Path)
      .d(d => d.spline ? `M${d.sourceX},${d.sourceY}C${d.sourceBisectX},${d.sourceBisectY} ${d.targetBisectX},${d.targetBisectY} ${d.targetX},${d.targetY}` : `M${d.source.x},${d.source.y} ${d.target.x},${d.target.y}`)
      .data(edges)
      .select(elem("g.d3plus-network-links", {parent, transition, enter: {transform}, update: {transform}}).node())
      .render());

    const that = this;

    const shapeConfig = {
      label: d => nodes.length <= this._labelCutoff || (this._hover && this._hover(d) || this._active && this._active(d)) ? this._drawLabel(d.data || d.node, d.i) : false,
      select: elem("g.d3plus-network-nodes", {parent, transition, enter: {transform}, update: {transform}}).node(),
      labelBounds: d => d.labelBounds,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 1,
      labelConfig: {
        rotate: d => nodeLookup[d.data.data.id].rotate || 0,
        fontColor: d => nodeLookup[d.data.data.id].fontColor ? configPrep.bind(that)(that._shapeConfig, "shape", d.key).fill(d) : configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.fontColor(d),
        fontSize: d => nodeLookup[d.data.data.id].fontSize || configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.fontSize,
        fontResize: d => d.data.data.id === this._center,
        textAnchor: d => nodeLookup[d.data.data.id].textAnchor || configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.textAnchor,
        verticalAlign: "middle"
      }
    };

    nest().key(d => d.shape).entries(nodes).forEach(d => {
      this._shapes.push(new shapes[d.key]()
        .config(configPrep.bind(this)(this._shapeConfig, "shape", d.key))
        .config(shapeConfig)
        .config(shapeConfig[d.key] || {})
        .data(d.values)
        .render());
    });

    return this;

  }

  /**
   @memberof Rings
   @desc Sets the center node.
   @param {String}
   @chainable
   */
  center(_) {
    return arguments.length ? (this._center = _, this) : this._center;
  }

  /**
      @memberof Network
      @desc Defines the maximum number of nodes that allow all labels to be shown. When the number of nodes is over this amount, labels will only be shown on hover and click.
      @param {Number} *value* = 100
      @chainable
  */
  labelCutoff(_) {
    return arguments.length ? (this._labelCutoff = _, this) : this._labelCutoff;
  }

  /**
      @memberof Network
      @desc A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
      @param {Array|String} *links* = []
      @param {Function} [*formatter*]
      @chainable
  */
  links(_, f) {
    if (arguments.length) {
      const prev = this._queue.find(q => q[3] === "links");
      const d = [load.bind(this), _, f, "links"];
      if (prev) this._queue[this._queue.indexOf(prev)] = d;
      else this._queue.push(d);
      return this;
    }
    return this._links;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
      @param {String|Function|Array} [*value* = undefined]
      @chainable
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
      @desc The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
      @param {Array|String} *nodes* = []
      @param {Function} [*formatter*]
      @chainable
  */
  nodes(_, f) {
    if (arguments.length) {
      const prev = this._queue.find(q => q[3] === "nodes");
      const d = [load.bind(this), _, f, "nodes"];
      if (prev) this._queue[this._queue.indexOf(prev)] = d;
      else this._queue.push(d);
      return this;
    }
    return this._nodes;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  size(_) {
    return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : accessor(_), this) : this._size;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.
      @param {Number} [*value*]
      @chainable
  */
  sizeMax(_) {
    return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.
      @param {Number} [*value* = 5]
      @chainable
  */
  sizeMin(_) {
    return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.
      @param {String} [*value* = "sqrt"]
      @chainable
  */
  sizeScale(_) {
    return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
  }

  /**
      @memberof Network
      @desc If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
      @chainable
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
      @chainable
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

}
