const { Parser } = require("../dist");

const parser = new Parser();

const code = `
module Demo exposing(..) 

{-|
# Demo
@docs parse    
-}
type YesOrNo
    = Yes
    | No

{-| Parse some code as if it is an Elm source file -}
parse : String -> String
parse code =
    "Parsed: " ++ code


`;

(async () => {
  const response = await parser.parse(code);
  const json = JSON.stringify(response, 4);
  console.log("Response: ", json);
  console.log("moduleDefinition", response.data.moduleDefinition);
})();
