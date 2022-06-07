import type { IterableInfer, ReturnIterableIteratorType } from '../types'
import { isAsyncIterable, isIterable } from '../iter'
import { tap } from '../misc/tap'
import { map } from './map'

/**
 * Iterar sobre uma lista de entrada,
 * chamando um `f` fornecido para cada elemento no Iterable/AsyncIterable.
 * Use-o quando quiser criar um efeito dentro do `pipe`.
 *
 * @example
 * ```ts
 * const iter = peek(a => console.log(a), [1, 2, 3, 4]);
 * iter.next() // {done:false, value: 1} // log 1
 * iter.next() // {done:false, value: 2} // log 2
 * iter.next() // {done:false, value: 3} // log 3
 * iter.next() // {done:false, value: 4} // log 4
 *
 * // com pipe
 * pipe(
 *  [1, 2, 3, 4],
 *  peek(a => console.log(a)),
 *  toArray,
 * ); // [1, 2, 3, 4] // log 1,2,3,4
 *
 * await pipe(
 *  Promise.resolve([1, 2, 3, 4]),
 *  peek(a => console.log(a)),
 *  toArray,
 * ); // [1, 2, 3, 4] // log 1,2,3,4
 *
 * // se você quiser usar o retorno de chamada assíncrono
 * await pipe(
 *  Promise.resolve([1, 2, 3, 4]),
 *  toAsync,
 *  peek(async (a) => console.log(a)),
 *  toArray,
 * ); // [1, 2, 3, 4] // log 1,2,3,4
 *
 * // com toAsync
 * await pipe(
 *  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)],
 *  toAsync,
 *  peek(a => console.log(a)),
 *  toArray,
 * ); // [1, 2, 3, 4] // log 1,2,3,4
 * ```
 */

// prettier-ignore
function peek<T>(
  f: (a: T) => unknown, iterable: Iterable<T>
): IterableIterator<T>;

function peek<T>(
  f: (a: T) => unknown,
  iterable: AsyncIterable<T>
): AsyncIterableIterator<T>

function peek<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: (a: Awaited<IterableInfer<T>>) => unknown
): (iterable: T) => ReturnIterableIteratorType<T>

function peek<T extends Iterable<unknown> | AsyncIterable<unknown>>(
  f: (a: Awaited<IterableInfer<T>>) => unknown,
  iterable?: T
):
  | IterableIterator<Awaited<IterableInfer<T>>>
  | AsyncIterableIterator<Awaited<IterableInfer<T>>>
  | ((iterable: T) => ReturnIterableIteratorType<T>) {
  if (iterable === undefined) {
    return (iterable: T) => {
      return peek(f, iterable as any) as ReturnIterableIteratorType<T>
    }
  }

  if (isIterable<Awaited<IterableInfer<T>>>(iterable)) {
    return map(tap(f), iterable) as ReturnIterableIteratorType<
      T,
      Awaited<IterableInfer<T>>
    >
  }

  if (isAsyncIterable<Awaited<IterableInfer<T>>>(iterable)) {
    return map(tap(f), iterable) as ReturnIterableIteratorType<
      T,
      Awaited<IterableInfer<T>>
    >
  }

  throw new TypeError("'iterable' must be type of Iterable or AsyncIterable")
}

export { peek }
