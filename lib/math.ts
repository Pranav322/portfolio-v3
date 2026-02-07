export function safeEvaluate(expression: string): number | string {
  // Regex to match the strict format: integer, operator, integer
  const match = expression.match(/^(\d+)([+\-*/])(\d+)$/);

  if (!match) {
    throw new Error('Invalid expression format');
  }

  const [_, leftStr, operator, rightStr] = match;
  const left = parseInt(leftStr, 10);
  const right = parseInt(rightStr, 10);

  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return left / right;
    default:
      throw new Error('Invalid operator');
  }
}
