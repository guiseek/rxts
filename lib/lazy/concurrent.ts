import type { Reject, Resolve } from '../types'
import { isAsyncIterable } from '../iter'

export class Concurrent {
  length: number

  constructor(length: number) {
    this.length = length
  }

  static of(length: number) {
    return new Concurrent(length)
  }
}

export const isConcurrent = (concurrent: unknown): concurrent is Concurrent => {
  return concurrent instanceof Concurrent
}

/**
 * Concurrent é usado para equilibrar o conteúdo de várias solicitações assíncronas.
 * O primeiro argumento recebe um número que controla o número de itens e o segundo argumento é um AsyncIterable.
 * Tente `toAsync` para criar um `AsyncIterable`.
 *
 * @example
 * ```ts
 * await pipe(
 *   [1, 2, 3, 4, 5, 6],
 *   toAsync,
 *   map((a) => delay(1000, a)),
 *   concurrent(3),
 *   each(console.log), // log 1, 2, 3, 4, 5, 6
 * ); // 2 seconds
 *
 * // avaliação
 * //              ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
 * //              │  1  │──│  2  │──│  3  │──│  4  │──│  5  │──│  6  │
 * //              └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
 * //      map        │        │        │        │        │        │
 * // concurrent(3)  (1)      (1)      (1)      (2)      (2)      (2)
 * //                 │        │        │        │        │        │
 * //                 ▼        ▼        ▼        ▼        ▼        ▼
 *
 * await pipe(
 *   [1, 2, 3, 4, 5, 6],
 *   toAsync,
 *   map((a) => delay(1000, a)),
 *   each(console.log), // log 1, 2, 3, 4, 5, 6
 * ); // 6 seconds
 *
 * // avaliação
 * //              ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
 * //              │  1  │──│  2  │──│  3  │──│  4  │──│  5  │──│  6  │
 * //              └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
 * //      map        │        │        │        │        │        │
 * //                (1)      (2)      (3)      (4)      (5)      (6)
 * //                 │        │        │        │        │        │
 * //                 ▼        ▼        ▼        ▼        ▼        ▼
 * ```
 */
function concurrent<A>(
  length: number,
  iterable: AsyncIterable<A>
): AsyncIterableIterator<A>

function concurrent<A>(
  length: number,
  iterable?: AsyncIterable<A>
): (iterable: AsyncIterable<A>) => AsyncIterableIterator<A>

function concurrent<A>(
  length: number,
  iterable?: AsyncIterable<A>
):
  | AsyncIterableIterator<A>
  | ((iterable: AsyncIterable<A>) => AsyncIterableIterator<A>) {
  if (iterable === undefined) {
    return (iterable) => {
      return concurrent(length, iterable)
    }
  }

  if (length === Infinity) {
    throw new RangeError("'length' cannot be infinite")
  }

  if (length <= 0) {
    throw new RangeError("'length' must be over 0")
  }

  if (!isAsyncIterable(iterable)) {
    throw new TypeError("'iterable' must be type of AsyncIterable")
  }

  const iterator = iterable[Symbol.asyncIterator]()
  const buffer: PromiseSettledResult<IteratorResult<A>>[] = []
  let prev = Promise.resolve()
  let nextCallCount = 0
  let resolvedItemCount = 0
  let finished = false
  let pending = false
  const settlementQueue: [Resolve<A>, Reject][] = []

  const consumeBuffer = () => {
    while (buffer.length > 0 && nextCallCount > resolvedItemCount) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const p = buffer.shift()!
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [resolve, reject] = settlementQueue.shift()!
      if (p.status === 'fulfilled') {
        resolvedItemCount++
        resolve(p.value)
        if (p.value.done) {
          finished = true
        }
      } else {
        reject(p.reason)
        finished = true
        break
      }
    }
  }

  const fillBuffer = () => {
    if (pending) {
      prev = prev.then(
        () =>
          void (!finished && nextCallCount > resolvedItemCount && fillBuffer())
      )
    } else {
      const nextItems = Promise.allSettled(
        Array.from({ length }, () =>
          iterator.next(Concurrent.of(length) as any)
        )
      )
      pending = true
      prev = prev
        .then(() => nextItems)
        .then((nextItems) => {
          buffer.push(...nextItems)
          pending = false
          recur()
        })
    }
  }

  function recur() {
    if (finished || nextCallCount === resolvedItemCount) {
      return
    } else if (buffer.length > 0) {
      consumeBuffer()
    } else {
      fillBuffer()
    }
  }

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next() {
      nextCallCount++
      if (finished) {
        return { done: true, value: undefined }
      }
      return new Promise((resolve, reject) => {
        settlementQueue.push([resolve, reject])
        recur()
      })
    },
  } as AsyncIterableIterator<A>
}

export { concurrent }
