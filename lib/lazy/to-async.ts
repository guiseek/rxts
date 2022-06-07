/**
 * Retorna AsyncIterable, `toAsync` usado quando você deseja manipular valores de Promise dentro de Iterable.
 *
 * @example
 * ```ts
 * let acc = 0;
 * for await (const item of toAsync([1, 2, 3, 4, 5])) {
 *   acc += item;
 * }
 * // acc: 15
 *
 * // com pipe
 * await pipe(
 *  [Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)],
 *  toAsync,
 *  map(a => a + 10),
 *  toArray, // [11, 12, 13]
 * );
 * ```
 */
function toAsync<T>(iter: Iterable<T | Promise<T>>): AsyncIterableIterator<T> {
  const iterator = iter[Symbol.iterator]()
  return {
    async next() {
      const { value, done } = iterator.next()
      if (value instanceof Promise) {
        return value.then((value) => ({ done, value }))
      } else {
        return { done, value }
      }
    },
    [Symbol.asyncIterator]() {
      return this
    },
  }
}

export { toAsync }
