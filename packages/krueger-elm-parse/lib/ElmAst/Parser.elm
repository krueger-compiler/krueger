module ElmAst.Parser exposing (..)

import Elm.Parser as EP 
import Parser exposing (DeadEnd)
import ElmAst.Ast as Ast exposing (Ast)

type alias ParseResult = Result (List DeadEnd) Ast

parse : String -> ParseResult
parse text = Err []

