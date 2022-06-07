type UniversalIterator<T = unknown> = Iterator<T> | AsyncIterator<T>

type UniversalIterable<T = unknown> = Iterable<T> | AsyncIterable<T>

type Iter<T> = UniversalIterator<T> | UniversalIterable<T>

export type { UniversalIterator, UniversalIterable, Iter }
