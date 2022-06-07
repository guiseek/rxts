/**
 * Retorna verdadeiro se `s` for uma String.
 *
 * @example
 * ```ts
 * isString("a"); // true
 * isString(2); // false
 * ```
 */
function isString(s: unknown): s is string {
  return typeof s === 'string'
}

export { isString }
