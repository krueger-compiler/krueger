import Elm from "./ElmParser.elm";
import deasync from "deasync";

export default class ElmParser {
  constructor() {
    this.parseSync = deasync(this.parse);
  }

  parse(doc, file, done) {
    const app = Elm.ElmParser.init({
      flags: doc
    });

    const onResponse = msg => {
      //console.log("Received response:\r\n", msg);
      done(null, msg);
      app.ports.channelOut.unsubscribe(onResponse);
    };

    app.ports.channelOut.subscribe(onResponse);

    app.ports.channelIn.send(doc);
  }
}
