type IdentityObject<T> = T extends object ? T : never

/**
 * Verifica se value é o tipo de objeto.
 *
 * @example
 * ```ts
 * isObject({}); // true
 * isObject([1, 2, 3]); // true
 * isObject(() => {}); // true
 * isObject(null); // false
 * isObject(123); // false
 * ```
 */
function isObject<T = unknown>(a: T): a is IdentityObject<T> {
  const type = typeof a
  return a != null && (type === 'object' || type === 'function')
}

export { isObject }
