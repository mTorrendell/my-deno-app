import { RuntimeVal, NumberVal, NullVal } from "./values.ts";
import { BinaryExpr, NumericLiteral, Program, Stmt } from "../frontend/ast.ts";

function eval_program (program: Program): RuntimeVal{
   let lastEvaluated : RuntimeVal = {type: "null", value: "null"} as NullVal
   for (const statemenet of program.body){
      lastEvaluated = evaluate(statemenet)
   }
   return lastEvaluated
}
function eval_numeric_binary_expr(lhs:NumberVal, rhs: NumberVal, operator: string) : NumberVal {
   let result: number;
   if(operator == "+")
      result = lhs.value + rhs.value;
   else if(operator == "-")
      result = lhs.value - rhs.value;
   else if(operator == "*")
      result = lhs.value * rhs.value;
   else if(operator == "/")
      result = lhs.value / rhs.value;
   else
      result = lhs.value % rhs.value;

   return {value: result, type:"number"}
}

function eval_binary_expr (binop: BinaryExpr): RuntimeVal{
   const lhs = evaluate (binop.left);
   const rhs = evaluate(binop.right);

   if(lhs.type =="number" && rhs.type == "number"){
      return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator,)
   }

   return {type:"null", value: "null"} as NullVal;
}



// Evaluating the nodes and transforming them into values
export function evaluate ( astNode: Stmt): RuntimeVal {


   switch (astNode.kind){
      case "NumericLiteral":
         return {
            value: ((astNode as NumericLiteral).value),
            type: "number",
         } as NumberVal;
      case "NullLiteral":
         return {value:"null", type: "null"} as NullVal;
      case "BinaryExpr":
         return eval_binary_expr(astNode as BinaryExpr);
      case "Program":
         return eval_program(astNode as Program)
      default:
         console.error("THi is AST Node has not yet been setup for interpretation", astNode )
         Deno.exit(0);
   }
}