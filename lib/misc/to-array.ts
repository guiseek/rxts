import type { ReturnArrayType } from '../types/return-array-type'
import { isAsyncIterable, isIterable } from '../iter/utils'

async function async<A>(iterable: AsyncIterable<A>): Promise<A[]> {
  const res: A[] = []
  for await (const item of iterable) {
    res.push(item)
  }
  return res
}

/**
 * Pega o item de Iterable/AsyncIterable e retorna uma matriz.
 * Recomenda-se usar junto ao `pipe`.
 *
 * @example
 * ```ts
 * pipe(
 *  [1, 2, 3, 4, 5],
 *  map(a => a + 10),
 *  filter(a => a % 2 === 0),
 *  toArray,
 * ); // [12, 14]
 *
 * await pipe(
 *  Promise.resolve([1, 2, 3, 4, 5]),
 *  map(a => a + 10),
 *  filter(a => a % 2 === 0),
 *  toArray,
 * ); // [12, 14]
 *
 * // se você quiser usar o retorno de chamada assíncrono
 * await pipe(
 *  Promise.resolve([1, 2, 3, 4, 5]),
 *  toAsync,
 *  map(async (a) => a + 10),
 *  filter(a => a % 2 === 0),
 *  toArray,
 * ); // [12, 14]
 *
 * // com toAsync
 * await pipe(
 *  [
 *    Promise.resolve(1),
 *    Promise.resolve(2),
 *    Promise.resolve(3),
 *    Promise.resolve(4),
 *    Promise.resolve(5)
 *  ],
 *  toAsync,
 *  map((a) => a + 10),
 *  filter((a) => a % 2 === 0),
 *  toArray
 *);
 * ```
 */
function toArray<A extends Iterable<unknown> | AsyncIterable<unknown>>(
  iter: A
): ReturnArrayType<A>

function toArray<A>(iter: AsyncIterable<A> | Iterable<A>) {
  if (isAsyncIterable(iter)) {
    return async(iter)
  } else if (isIterable(iter)) {
    return Array.from(iter)
  } else {
    return [] as A[]
  }
}

export { toArray }
