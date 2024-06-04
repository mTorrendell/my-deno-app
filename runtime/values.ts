// define the types that we are going to be using for our runtime

//Tagged union: data structure used in programming languages to store values that can be one of several different types
export type ValueType = "null" | "number";
//object, booleans and strings could be added in the future

export interface RuntimeVal {
   type: ValueType;
}


export interface NullVal extends RuntimeVal {
   type: "null";
   value: "null";
}


export interface NumberVal extends RuntimeVal {
   type: "number";
   value: number;
}
