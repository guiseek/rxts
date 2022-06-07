import { isAsyncIterable, isIterable } from '../iter'
import { isString } from './is-string'
import { isArray } from './is-array'
import { reduce } from './reduce'

type LastReturnType<T> = T extends readonly [...rest: any[], a: infer L]
  ? L
  : T extends readonly never[]
  ? undefined
  : T extends AsyncIterable<infer U>
  ? Promise<U | undefined>
  : T extends Iterable<infer U>
  ? U | undefined
  : never

/**
 * Retorna o último elemento de Iterable/AsyncIterable
 *
 * @example
 * ```ts
 * last([1, 2, 3, 4, 5]); // 5
 *
 * // com pipe
 * pipe(
 *  [1, 2, 3, 4, 5],
 *  last,
 * ); // 5
 *
 * await pipe(
 *  Promise.resolve([1, 2, 3, 4, 5]),
 *  last,
 * ); // 5
 *
 * // com toAsync
 * await pipe(
 *  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
 *  toAsync,
 *  last,
 * ); // 3
 * ```
 */
function last<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T
): LastReturnType<T>

function last<A>(iterable: Iterable<A> | AsyncIterable<A>) {
  if (isArray(iterable) || isString(iterable)) {
    return iterable[iterable.length - 1]
  }
  if (isIterable(iterable)) {
    return reduce((_, a) => a, iterable)
  } else if (isAsyncIterable(iterable)) {
    return reduce((_, a) => a, iterable)
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable")
}

export { last }
