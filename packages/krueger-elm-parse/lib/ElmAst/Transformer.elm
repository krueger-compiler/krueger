module ElmAst.Transformer exposing (..)

import Elm.RawFile as RF exposing (RawFile)
import Elm.Syntax.File exposing (File)
import ElmAst.Ast as A exposing(Ast(..))

astFromRawFile : RawFile -> Maybe Ast 
astFromRawFile file =
    Nothing

astFromElmFile : File -> Maybe Ast
astFromElmFile file = 
    Nothing
