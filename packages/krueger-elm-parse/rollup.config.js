import { resolve as resolvePath, format } from "path";
import elm from "rollup-plugin-elm";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
  {
    input: "index.js",
    output: [
      {
        file: resolvePath(__dirname, "dist/index.js"),
        format: "cjs"
      },
      {
        file: resolvePath(__dirname, "dist/index.esm.js"),
        format: "esm"
      }
    ],
    external: ["deasync"],
    plugins: [
      elm({
        exclude: "elm-stuff/**"
      }),
      resolve()
      //commonjs()
    ]
  }
];
