import type { IterableInfer } from './iterable-infer'

type ReturnIterableIteratorType<
  T extends Iterable<unknown> | AsyncIterable<unknown>,
  R = IterableInfer<T>
> = T extends Iterable<unknown>
  ? IterableIterator<R>
  : T extends AsyncIterable<unknown>
  ? AsyncIterableIterator<Awaited<R>>
  : never

export type { ReturnIterableIteratorType }
