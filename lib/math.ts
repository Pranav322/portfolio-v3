export function safeEvaluate(expression: string): number | string {
  // Regex to ensure safe input (integer arithmetic only)
  // This matches: 1+2, 10-5, 100*2, 50/2
  const regex = /^\d+[+\-*/]\d+$/;
  if (!regex.test(expression)) {
    throw new Error('Invalid expression format');
  }

  // Parse operator
  const operatorMatch = expression.match(/[+\-*/]/);
  if (!operatorMatch) {
    throw new Error('Invalid operator');
  }

  const operator = operatorMatch[0];
  const [leftStr, rightStr] = expression.split(operator);

  const left = parseInt(leftStr, 10);
  const right = parseInt(rightStr, 10);

  if (isNaN(left) || isNaN(right)) {
    throw new Error('Invalid numbers');
  }

  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) return Infinity;
      return left / right;
    default:
      throw new Error('Unknown operator');
  }
}
