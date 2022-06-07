/**
 * Retorna verdadeiro se `a` for um Array.
 *
 * @example
 * ```ts
 * isArray([1, 2, 3]); // true
 * isArray(2); // false
 * ```
 */
function isArray(a: any): a is any[] {
  return Array.isArray(a)
}

export { isArray }
