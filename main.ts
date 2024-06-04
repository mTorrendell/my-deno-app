import Parser from "./frontend/parser.ts"
import { evaluate } from "./runtime/interpreter.ts";
import { TYPES } from "./frontend/lexer.ts";

// Read-Eval-Print Loop for inputing variouse commands
repl();

function repl(){
   const parser= new Parser();
   console.log("\n\nCurrent Types\n--------------\n" , TYPES)
   console.log("\n\nMy REPL program\n----------------");
   //Infinite loop
   while(true){
      const input = prompt("->");

      if(!input || input.toLowerCase().includes("exit")){
         Deno.exit(1);
      }
      const program = parser.produceAST(input);
      console.log("\n\n\nAbstract Syntax Tree from Source Code\n--------------------------------------\n" , program)

      const result = evaluate(program)
      console.log("\n\n\nEvaluation of Source Code\n--------------------------\n",result)
   }
}