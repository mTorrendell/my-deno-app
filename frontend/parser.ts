// deno-lint-ignore-file no-explicit-any
import {Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, NullLiteral} from "./ast.ts"
import {tokenize, Token, TokenType} from "./lexer.ts"


// first take in the tokens that we created that we created in our tokenizer
export default class Parser{
   private tokens: Token[] = [];
   private not_eof(): boolean{
      return this.tokens[0].type != TokenType.EOF;
   }

   private at (){
      //return the current token we are at because we will be deleting all of the positions
      return this.tokens[0] as Token;
   }

   private eat(){
      //shift just removes it from the begining
      const prev = this.tokens.shift() as Token;
      return prev;
   }

   private expect(type: TokenType, err: any){
      const prev = this.tokens.shift () as Token;
      if (!prev || prev.type != type){
         console.log("Parser Error: ", err, prev, "Expecting: " , type)
         Deno.exit(1);
      }
      return prev;
   }

   public produceAST (sourceCode: string) : Program{
      this.tokens = tokenize(sourceCode);
      //Look at the interface defined in the ast to see what it should involve
      const program : Program = {
         kind: "Program",
         body: [],
      }
      //We will parse until the end of the file
      while (this.not_eof()){
         program.body.push(this.parse_stmt())
      }

      return program;
   }

   private parse_stmt() : Stmt {
      // At the moment we do not really have any statement to parse
      // The only was was program which we already did
      // Function declarations statemenets, try catch blocks, while loops

      //skip to parse_expr

      return this.parse_expr();
   }
   //An expression is a statement but not the other way around
   private parse_expr(): Expr {
      //primary expressions
      return this.parse_expr_additive_expr();
   }

   // We need to handle left hand presedence Recursive presedence
   private parse_expr_additive_expr() : Expr{
      let left = this.parse_expr_multiplicative_expr();
      while (this.at().value == "+" || this.at().value == "-"){
         const operator= this.eat().value;
         const right = this.parse_expr_multiplicative_expr();
         left = {
            kind : "BinaryExpr",
            left,
            right,
            operator,
         } as BinaryExpr;
      }
      return left;

   }
   private parse_expr_multiplicative_expr() : Expr{
      let left = this.parse_primary_expr();
      while (this.at().value == "/" || this.at().value == "*" || this.at().value == "%"){
         const operator= this.eat().value;
         const right = this.parse_primary_expr();
         left = {
            kind : "BinaryExpr",
            left,
            right,
            operator,
         } as BinaryExpr;
      }
      return left;

   }

   // Orders of Prescidence (order of evaluation) --> the higher the presidence we wan to have it last

   // AdditiveExpr
   // MultiplicitExpr
   // PrimaryExpr --> HIGHEST
   private parse_primary_expr(): Expr {
      const tk = this.at().type;
      switch (tk){
         case TokenType.Identifier:
            return {kind:"Identifier", symbol: this.eat().value} as Identifier;
         case TokenType.Null:
            this.eat(); //advance null keyword
            return  {kind: "NullLiteral", value: null } as NullLiteral;
         case TokenType.Number:
            return {kind:"NumericLiteral", value: parseFloat(this.eat().value)} as NumericLiteral;
         case TokenType.OpenParen: {
            this.eat();
            const value = this.parse_expr();
            this.expect(TokenType.CloseParen, "Unexpected token found. Expected closing parenthesis.",);
            return value;
         }
         default:
            console.error("Unexpected token found druring parsing!" , this.at())
            Deno.exit(1);
      }
   }
}