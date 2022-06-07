/**
 *
 * Retorna um iterador dos próprios nomes de propriedade enumeráveis do objeto.
 *
 * @example
 * ```ts
 * [...keys({ a: 1, b: "2", c: true })]
 * // ["a", "b", "c"]
 * ```
 */

function* keys<T extends Record<string, any>>(obj: T) {
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      yield k
    }
  }
}

export { keys }
