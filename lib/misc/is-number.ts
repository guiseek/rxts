/**
 * Retorna verdadeiro se `n` for um número.
 *
 * @example
 * ```ts
 * isNumber(2); // true
 * isNumber("a"); // false
 * ```
 */
function isNumber(n: unknown): n is number {
  return typeof n === 'number'
}

export { isNumber }
