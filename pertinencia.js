/**
 * Shunting yard algorithm
 * See: http://en.wikipedia.org/wiki/Shunting_yard_algorithm
 *
 * Converts infix notation to postfix notation
 *
 * by Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 * modified by Juscelino Junior
 * MIT Style License
 */

// helper, top element of an array w/o removing it
Array.prototype.peek = function () {
  return this[this.length - 1];
};

// operators set
var operators = {"&minus;": 1, "&cup;": 1, "&cap;": 1, "'":1};

// associations (left / right) sets
var leftAssoc =  {"&minus;": 1, "&cup;": 1, "&cap;": 1};
//var rightAssoc = {"=": 1, "!": 1};
var rightAssoc = {"'":1};

/**
 * precedenceOf
 *
 * precedence   operators       associativity
 * 3            ~               left to right
 * 2            -               left to right
 * 1            v,^             left to right
 */

var precedenceOf = {
  "&cup;": 1,
  "&cap;": 1,
  "&minus;": 2,
  "'": 3
};

/**
 * Shunting_yard_algorithm
 * @param {String} string
 *
 * TODO:
 *    - support digits > 10
 *    - functions
 */
function shuntingYard(string) {

  var output = [];
  var stack = [];

  for (var k = 0, length = string.length; k < length;  k++) {

    // current char
    var ch = string[k];

    if(ch==="&"){
      while(string[k]!=";"){
        ch = ch + string[k+1];
        k = k+1;
      }
    }

    // skip whitespaces
    if (ch == " ")
      continue;

    // if it's a set, add it to the output queue
    if(ch.charCodeAt()>=65 && ch.charCodeAt()<=90){
      pBegin = "";
      pEnd = "";
      j = k-1;
      while(string[j] === '('){
        pBegin = pBegin + '('
        j--;
      }

      j = k+1;
      while(string[j] === ')'){
        pEnd = pEnd + ')'
        j++;
      }

      ch=pBegin + ch + pEnd;
      output.push(ch);
    }  

    // TODO: if the token is a function token, then push it onto the stack

    // TODO: if the token is a function argument separator (e.g., a comma):

    // if the token is an operator, op1, then:
    else if (ch in operators) {

      var op1 = ch; // just for readability

      // while ...
      while (stack.length) {

        // ... there is an operator token, op2, at the top of the stack
        var op2 = stack.peek();

        if (op2 in operators && (
            // and op1 is left-associative and its precedence is less than or equal to that of op2,
            (op1 in leftAssoc && (precedenceOf[op1] <= precedenceOf[op2])) ||
            // or op1 is right-associative and its precedence is less than that of op2,
            (op1 in rightAssoc && (precedenceOf[op1] < precedenceOf[op2]))
        )) {

          // push op2 onto the output queue (it's already popped from the stack);
          output.push(stack.pop()); // op2

        } else {
          break;
        }

      }

      // push op1 onto the stack
      stack.push(op1);

    }

    // if the token is a left parenthesis, then push it onto the stack.
    else if (ch == "(")
      stack.push(ch);

    // if the token is a right parenthesis:
    else if (ch == ")") {

      var foundLeftParen = false;

      // until the token at the top of the stack is a left parenthesis,
      // pop operators off the stack onto the output queue
      while (stack.length) {
        var c = stack.pop();
        if (c == "(") {
          foundLeftParen = true;
          break;
        } else {
          output.push(c);
        }
      }

      // if the stack runs out without finding a left parenthesis, then there are mismatched parentheses.
      if (!foundLeftParen)
        throw "Error: parentheses mismatched";

      // pop the left parenthesis from the stack, but not onto the output queue.
      //stack.pop();

      // TODO: if the token at the top of the stack is a function token, pop it onto the output queue.

    }

    else throw "Unknown token " + ch;
    //console.log(stack);
  }

  // when there are no more tokens to read:
  // while there are still operator tokens in the stack:
  while (stack.length) {

    var c = stack.pop();

    if (c == "(" || c == ")")
      throw "Error: parentheses mismatched";

    // push it to the output
    output.push(c);

  }

  return output.join(" ");

}

function Lines(string, letters){
  for(i=0;i<string.length;i++){
    if(string[i].charCodeAt()>=65 && string[i].charCodeAt()<=90){
      if(letters.includes(string[i])==false){
        letters = letters + string[i];
      }
    }
  }
  return letters;
}

function valueSet(set, lines, order){
  let jump = Math.pow(2, order); // how many times the same number repeats
  let count = 0; // count to the jump
  let value = 1; // values start 1;
  for(let i=0; i<lines; i++){
      set[i] = value; // Assign value to the current line
      count++; // Increment counter;
      if(count===jump){
          count = 0; // if count==jump, reset count;
          if(value===1){ // if count==jump, change value;
              value = 0;
          }else{
              value = 1;
          }
      }
  }
}

// Get two sets and makes Union.
function Union(setA, setB, setResult, lines){
  for(let i=0; i<lines; i++){
    if(setA[i]===0 && setB[i]===0){
      setResult[i] = 0;
    }else{
      setResult[i] = 1;
    }
  }
}

// Get two sets and makes Intersection.
function Intersection(setA, setB, setResult, lines){
  for(let i=0; i<lines; i++){
    if(setA[i]===1 && setB[i]===1){
      setResult[i] = 1;
    }else{
      setResult[i] = 0;
    }
  }
}

// Get two sets and makes Complements.
function Complements(setA, setB, setResult, lines){
  for(let i=0; i<lines; i++){
    if(setA[i]===0){
      setResult[i] = 0;
    }else if(setB[i]===0){
      setResult[i] = 1;
    }else{
      setResult[i] = 0;
    }
  }
  console.log("como tá setB?",setB);
}

// Get two sets and makes Complements Universe.
function ComplementsU(set, setResult, lines){
  for(let i=0; i<lines; i++){
    if(set[i]===0){
      setResult[i] = 1;
    }else{
      setResult[i] = 0;
    }
  }
}

function Expression(string){
  contOp = 0;
  let output = shuntingYard(string);
  let sets = [];
  let letters = "";
  letters = Lines(string, letters);
  let lines = Math.pow(2,letters.length);
  let stack = [];
  let stackOp = [];
  for(let i=0;i<letters.length;i++){
    let setTmp= [];
    valueSet(setTmp, lines, i);
    sets[i] = setTmp;
    document.getElementsByClassName("table")[0].innerHTML += 
    '<div class="item">' +
    '<section class="op container column">' +
    '<div class="title item"><h1>' + letters[i] + '</h1></div>';
    for(let j=0;j<lines;j++){
      document.getElementsByClassName("op")[contOp].innerHTML += '<div class="item line">' + setTmp[j] + '</div>';
    }
    contOp++;  
    //document.getElementsByClassName("table")[0].innerHTML += '</section>' + '</div>';
  }

  /*for(let i=0;i<letters.length;i++){
    console.log(letters[i], sets[i]);
  }*/

  for(let i=0;i<output.length;i++){
    if(letters.includes(output[i])){
      pBegin = "";
      pEnd = "";
      let position;
      for(let j=0;j<letters.length;j++){
        if(letters[j]===output[i]) position = j;
      }
      stack.push(sets[position]);
      //console.log("E  aí?",stack[stack.length-1]);
      console.log("Empilhei ", sets[position]);

      j = i-1;
      while(output[j] === '('){
        pBegin = pBegin + '(';
        //console.log("P: ", output[j]);
        j--;
      }

      j = i+1;
      while(output[j] === ')'){
        pEnd = pEnd + ')';
        j++;
      }

      stackOp.push(pBegin + output[i] + pEnd);
    }
    let current = output[i];
    if(current === '&'){
      while(output[i]!=";"){
      current = current + output[i+1];
      i = i+1;
      }
      //console.log(current);
    }

    if(current === '&cup;' || current === '&cap;' || current === '&minus;' || current === "'"){
      let auxSet2 = [];
      let auxSet = [];
      let setResult = [];
      switch(current){
        case '&cup;':
          auxSet2 = stack.pop();
          auxSet = stack.pop();
          auxOp2 = stackOp.pop();
          auxOp = stackOp.pop();
          opResult = auxOp + " " + current + " " + auxOp2;
          Union(auxSet, auxSet2, setResult, lines);
          //console.log(setResult);
          break;
        case '&minus;':
          console.log(stack[stack.length-2]);
          console.log(stack[stack.length-1]);
          auxSet2 = stack.pop();
          auxSet = stack.pop();
          auxOp2 = stackOp.pop();
          auxOp = stackOp.pop();
          opResult = auxOp + " " + current + " " + auxOp2;
          Complements(auxSet, auxSet2, setResult, lines);
          break;
        case '&cap;':
          auxSet2 = stack.pop();
          auxSet = stack.pop(); 
          auxOp2 = stackOp.pop();
          auxOp = stackOp.pop();
          opResult = auxOp + " " + current + " " + auxOp2; 
          Intersection(auxSet, auxSet2, setResult, lines); 
          break;
        case "'":
          auxSet = stack.pop();
          auxOp = stackOp.pop();
          opResult = auxOp + current;
          ComplementsU(auxSet, setResult, lines);
          break;
    }
    //console.log(setResult);
    //console.log(current);
    stack.push(setResult);
    console.log(stack[stack.length-3]);
    console.log(stack[stack.length-2]);
    console.log(stack[stack.length-1]); 
    //console.log(stack);
    stackOp.push(opResult);
      if(opResult.includes('(')==false ||  opResult.includes(')')==false){
        opResult = opResult.replace(/[)]/g,"");
      }
        document.getElementsByClassName("table")[0].innerHTML += 
        '<div class="item">' +
        '<section class="op container column">' + 
        '<div class="title item"><h1>' + opResult + '</h1></div>';
        for(let j=0;j<lines;j++){
          document.getElementsByClassName("op")[contOp].innerHTML += '<div class="item line">' + setResult[j] + '</div>';
        }
        
        for(let k=0;k<lines*(contOp+1);k++){
          if(k%2==0)
            document.getElementsByClassName("line")[k].style.background = "#0673F1";
        }
        contOp++;  
  }
}
}

// tests

let arg = '';