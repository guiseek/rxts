/**
 * Retorna true se o primeiro argumento for menor que o segundo; falso caso contrário.
 *
 * @example
 * ```ts
 * lt(5, 1) // false
 * lt(1, 5) // true
 * lt("a", "b") // true
 * lt("b", "a") // false
 *
 * filter(lt(5), [1, 2, 4, 5, 8, 9]) // Iterable<[8, 9]>
 * filter(lt(7), [5, 6, 7]) // Iterable<[]>
 * filter(lt("b"), ["a", "b", "c"]) // Iterable<["c"]>
 * filter(lt("e"), ["b", "c", "d"]) // Itreable<[]>
 * ```
 */
function lt(a: string): (b: string) => boolean
function lt(a: number): (b: number) => boolean
function lt(a: Date): (b: Date) => boolean
function lt(a: string, b: string): boolean
function lt(a: number, b: number): boolean
function lt(a: Date, b: Date): boolean

function lt(a: any, b?: any): ((b: any) => boolean) | boolean {
  if (b === undefined) {
    return (_b: any) => lt(a, _b)
  }

  if (a.constructor !== b.constructor) {
    throw new TypeError(
      'The values you want to compare must be of the same type'
    )
  }

  return a < b
}

export { lt }
