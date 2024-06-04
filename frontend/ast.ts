//so in the future there should also be expression / varibale/ functiondecelaration / import / while / for statements etc
//these are the first types we use in our parse to get basci mathematical operations
export type NodeType =
"Program" |
"NumericLiteral" |
"Identifier" |
"NullLiteral" |
"BinaryExpr"


// Statement we do not want it to return a value
export interface Stmt {
   kind: NodeType;
}

// Statement vs Expressions


// Program - is an array of all of the statemnts in a file (so it is everything that is being written in the program)
// Like in js a statement is an if-statement for example unlike in rust for example
export interface Program extends Stmt{
   kind: "Program",
   body: Stmt[];
}

// Expresion returns a value
export interface Expr extends Stmt {}

// 10 - 5  or foo - bar (these are both expressions)
export interface BinaryExpr extends Expr{
   kind: "BinaryExpr"
   left:Expr,
   right:Expr,
   operator: string;
}

export interface Identifier extends Expr {
   kind:"Identifier",
   symbol: string;
}


export interface NumericLiteral extends Expr {
   kind:"NumericLiteral",
   value: number;
}

export interface NullLiteral extends Expr {
   kind:"NullLiteral",
   value: null;
}

