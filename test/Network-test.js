import assert from "assert";
import {default as Network} from "../src/Network.js";
import it from "./jsdom.js";

it("Network", function *() {

  yield cb => {

    new Network().render(cb);

  };

  assert.strictEqual(document.getElementsByTagName("svg").length, 1, "automatically added <svg> element to page");
  assert.strictEqual(document.getElementsByClassName("d3plus-Network").length, 1, "created <g> container element");

});