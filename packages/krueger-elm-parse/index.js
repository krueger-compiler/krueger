import ElmParser from "./lib/parser";
import transform from "elmast-util-from-elmst";

module.exports = parse;

export default function parse(options) {
  this.Parser = parser;
  const elmParser = new ElmParser();
  /**
   *
   * @param {string} doc
   * @param {*} file
   */
  function parser(doc, file) {
    console.log(
      "=============================Parsing File====================\r\n",
      doc
    );

    const parseResult = elmParser.parseSync(doc, file);

    if (parseResult.type) {
      if (parseResult.type === "Success") {
        return transform(parseResult.data);
      }

      console.dir(parseResult.errors);
      if (parseResult.type === "Failure") {
        parseResult.errors.forEach(error => {
          console.log(
            `${error.row}:${error.col} Error: problem: ${error.problem}.`
          );
          const message = file.message(error.problem + "", {
            column: error.col,
            line: error.row
          });

          message.fatal = true;
        });

        return {
          type: "root",
          children: []
        };
      }
    }
  }
}
