import { resolve as resolvePath, format } from "path";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
  {
    input: "./src/index.js",
    output: {
      file: resolvePath(__dirname, "dist/index.js"),
      format: "cjs"
    },
    plugins: [resolve(), typescript(), commonjs()]
  }
];
