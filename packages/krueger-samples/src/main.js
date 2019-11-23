const { resolve } = require("path");
const unified = require("unified");
const inspect = require("unist-util-inspect");
const vfile = require("to-vfile");
const parser = require("krueger-elm-parse");
const report = require("vfile-reporter");

const inputPath = resolve(__dirname, "../examples/src/LogBook.elm");

const input = vfile.readSync(inputPath);

const processor = unified()
  .use(parser)
  .use(compile)
  .process(input, function(err, file) {
    console.error(report(err || file));
    console.log(String(file));
  });

function compile() {
  this.Compiler = tree => {
    console.log("Compiled: ", "\r\n", tree);
    return inspect(tree);
  };
}
