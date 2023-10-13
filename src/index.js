module.exports = function check(str, bracketsConfig) {
  let OPEN_BRACKETS = []
  let SAME_BRACKETS = []
  let BRACKETS_PAIR = bracketsConfig.reduce((acc, current) => {
    acc[current[1]] = current[0];
    return acc;
  }, {});

  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] !== bracketsConfig[i][1]) {
      OPEN_BRACKETS.push(bracketsConfig[i][0])
    } else {
      SAME_BRACKETS.push(bracketsConfig[i][0])
    }
  }

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const currentSymbol = str[i];
    const topElement = stack[stack.length - 1];

    if (SAME_BRACKETS.includes(currentSymbol)) {
      if (!stack.includes(currentSymbol)) {
        stack.push(currentSymbol);
      } else {
        if (currentSymbol == topElement) {
          stack.pop();
        } else {
          return false;
        }
      }
    } else if (OPEN_BRACKETS.includes(currentSymbol)) {
      stack.push(currentSymbol);
    } else {
      if (stack.length === 0) {
        return false;
      }

      if (BRACKETS_PAIR[currentSymbol] == topElement) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
