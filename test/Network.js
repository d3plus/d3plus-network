import {test} from "tape";
import {default as Network} from "../src/Network.js";

test("Network", assert => {

  new Network()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
