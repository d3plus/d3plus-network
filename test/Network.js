import zora from "zora";
import {default as Network} from "../src/Network.js";

export default zora()
  .test("Network", function *(assert) {

    yield cb => new Network().render(cb);
    assert.ok(true, "function success");

  });
