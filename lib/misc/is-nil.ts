type Nullable<T> = T extends null | undefined ? T : never

/**
 * Verifica se o valor fornecido é `null` ou `undefined`.
 *
 * @example
 * ```ts
 * isNil(1); // false
 * isNil('1'); // false
 * isNil(undefined); // true
 * isNil(null); // true
 * ```
 */
function isNil<T>(a: T): a is Nullable<T> {
  if (a === undefined || a === null) {
    return true
  }

  return false
}

export { isNil }
