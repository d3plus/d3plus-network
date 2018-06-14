import {sankey, sankeyLinkHorizontal} from "d3-sankey";

import {accessor, assign, configPrep, constant, elem} from "d3plus-common";
import {Path, Rect} from "d3plus-shape";
import {dataLoad as load, Viz} from "d3plus-viz";

/**
    @class Rings
    @extends external:Viz
    @desc Creates a sankey visualization based on a defined set of XXXXX. [Click here](xxxxxx) for help getting started using the Sankey class.
*/
export default class Sankey extends Viz {

  /**
      @memberof Sankey
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();
    this._links = accessor("links");
    this._noDataMessage = false;
    this._nodes = accessor("nodes");
    this._sankey = sankey();
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
        strokeWidth: 20,
        strokeOpacity: 0.6
      }
    });
  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {
    super._draw(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    const path = sankeyLinkHorizontal();

    const transform = `translate(${this._margin.left}, ${this._margin.top})`;

    const sankeyData = this._sankey
      .nodeWidth(30)
      // .nodePadding(10)
      .nodes(this._nodes)
      .links(this._links)
      .size([width, height])();

    /* sankeyData.forEach((d, i) => {
      d.__d3plus__ = true;
      d.i = i;
    });*/

    // const link = sankey.data(links)

    this._shapes.push(
      new Path()
        .config(this._shapeConfig)
        .config(this._shapeConfig.Path)
        .data(this._links)
        .d(path)
        .select(
          elem("g.d3plus-Links", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(
          configPrep.bind(this)(
            assign(this._shapeConfig, {
              Path: {
                strokeWidth: d =>
                  Math.max(
                    1,
                    Math.abs(d.source.y1 - d.source.y0) *
                      (d.value / d.source.value) -
                      20
                  )
              }
            }),
            "shape",
            "Path"
          )
        )
        .render()
    );

    this._shapes.push(
      new Rect()
        .config(this._shapeConfig)
        .config(this._shapeConfig.Path)
        .data(this._nodes)
        .height(d => d.y1 - d.y0)
        .width(d => d.x1 - d.x0)
        .x(d => (d.x1 + d.x0) / 2)
        .y(d => (d.y1 + d.y0) / 2)
        .select(
          elem("g.d3plus-sankey-nodes", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Rect"))
        .render()
    );

    return this;
  }

  /**
      @memberof Network
      @desc A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](#) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
      @param {Array|String} *links* = []
      @chainable
  */
  links(_) {
    return arguments.length ? (this._links = _, this) : this._links;
  }

  /**
      @memberof Sankey
      @desc The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
      @param {Array|String} *nodes* = []
      @chainable
  */
  nodes(_) {
    return arguments.length ? (this._nodes = _, this) : this._nodes;
  }
}
