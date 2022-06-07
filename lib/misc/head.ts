import { isAsyncIterable, isIterable } from '../iter/utils'
import { toArray } from './to-array'
import { take } from '../lazy/take'
import { pipe } from './pipe'

type HeadReturnType<T> = T extends readonly [a: infer H, ...rest: any[]]
  ? H
  : T extends readonly never[]
  ? undefined
  : T extends AsyncIterable<infer U>
  ? Promise<U | undefined>
  : T extends Iterable<infer U>
  ? U | undefined
  : never

/**
 * Retorna o primeiro elemento de Iterable/AsyncIterable.
 *
 * @example
 * ```ts
 * head([1, 2, 3, 4, 5]); // 1
 *
 * // com pipe
 * pipe(
 *  [1, 2, 3, 4, 5],
 *  head,
 * ); // 1
 *
 * await pipe(
 *  Promise.resolve([1, 2, 3, 4, 5]),
 *  head,
 * ); // 1
 *
 * // com toAsync
 * await pipe(
 *  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
 *  toAsync,
 *  head,
 * ); // 1
 * ```
 */
function head<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  iterable: T
): HeadReturnType<T>

function head<A>(iterable: Iterable<A> | AsyncIterable<A>) {
  if (isIterable(iterable)) {
    return pipe(take(1, iterable), toArray, ([a]) => a)
  }
  if (isAsyncIterable(iterable)) {
    return pipe(take(1, iterable), toArray, ([a]) => a)
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable")
}

export { head }
