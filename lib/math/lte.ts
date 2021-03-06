/**
 * Retorna true se o primeiro argumento for menor ou igual ao segundo; falso caso contrário.
 *
 * @example
 * ```ts
 * lte(5, 1) // expected false
 * lte(1, 1) // expected true
 * lte(1, 5) // expected true
 * lte("a", "b") // expected true
 * lte("b", "a") // expected false
 *
 * filter(lte(5), [1, 2, 4, 5, 8, 9]) // Iterable<[5, 8, 9]>
 * filter(lte(9), [6, 7, 8]) // Iterable<[]>
 * filter(lte("b"), ["a", "b", "c"]) // Iterable<["b", "c"]>
 * filter(lte("e"), ["c", "d"]) // Itreable<[]>
 * ```
 */
function lte(a: string): (b: string) => boolean
function lte(a: number): (b: number) => boolean
function lte(a: Date): (b: Date) => boolean
function lte(a: string, b: string): boolean
function lte(a: number, b: number): boolean
function lte(a: Date, b: Date): boolean

function lte(a: any, b?: any): ((b: any) => boolean) | boolean {
  if (b === undefined) {
    return (_b: any) => lte(a, _b)
  }

  if (a.constructor !== b.constructor) {
    throw new TypeError(
      'The values you want to compare must be of the same type'
    )
  }

  return a <= b
}

export { lte }
