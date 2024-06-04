export enum TokenType {
   Null,
   Number,
   Identifier,
   Equals,
   OpenParen,
   CloseParen,
   BinaryOperator,
   Let,
   EOF // end of file
}

export const TYPES: Record<TokenType, string> = {
   [TokenType.Number]: "Number",
   [TokenType.Identifier]: "Identifier",
   [TokenType.Equals]: "Equals",
   [TokenType.OpenParen]: "OpenParen",
   [TokenType.CloseParen]: "CloseParen",
   [TokenType.BinaryOperator]: "BinaryOperator",
   [TokenType.Let]: "Let",
   [TokenType.EOF]: "EOF",
   [TokenType.Null]: "Null",
};


const KEYWORDS: Record<string, TokenType> = {
   let: TokenType.Let,
   null: TokenType.Null,
};

export interface Token {
   value: string;
   type: TokenType;
}

function createToken(value: string, type: TokenType): Token {
   return { value, type };
}

function isAlpha(src: string) {
   return src.toUpperCase() !== src.toLowerCase();
}

function isSkippable(str: string) {
   return str === " " || str === "\n" || str === "\t";
}

function isInt(str: string) {
   const c = str.charCodeAt(0);
   const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
   return c >= bounds[0] && c <= bounds[1];
}

export function tokenize(sourceCode: string): Token[] {
   const tokens: Token[] = [];
   const sourceCharacters = sourceCode.split("");

   while (sourceCharacters.length > 0) {
      const char = sourceCharacters.shift() as string;
      //changed all of the if-statements for a switch, it is more readable and it looks cleaner.
      switch (char) {
         case "(":
            tokens.push(createToken(char, TokenType.OpenParen));
            break;
         case ")":
            tokens.push(createToken(char, TokenType.CloseParen));
            break;
         case "+":
         case "-":
         case "*":
         case "/":
         case "%":
            tokens.push(createToken(char, TokenType.BinaryOperator));
            break;
         case "=":
            tokens.push(createToken(char, TokenType.Equals));
            break;
         default:
            if (isInt(char)) {
               let num = char;
               while (sourceCharacters.length > 0 && isInt(sourceCharacters[0])) {
                  num += sourceCharacters.shift();
               }
               tokens.push(createToken(num, TokenType.Number));
            } else if (isAlpha(char)) {
               let ident = char;
               while (sourceCharacters.length > 0 && isAlpha(sourceCharacters[0])) {
                  ident += sourceCharacters.shift();
               }
               const keywordType = KEYWORDS[ident];
               tokens.push(createToken(ident, typeof keywordType == "number" ? keywordType : TokenType.Identifier));
            } else if (isSkippable(char)) {
               // Skip whitespace characters
            } else {
               console.error("Unrecognized character found in source:", char);
               throw new Error("Unrecognized character found in source");
            }
            break;
      }
   }
   tokens.push({type:TokenType.EOF, value:"EndOfFile"});
   return tokens;
}