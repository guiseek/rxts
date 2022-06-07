import { Iter } from '../types/iter'

function isIterable<T = unknown>(a: Iter<T> | unknown): a is Iterable<T> {
  return typeof (a as any)?.[Symbol.iterator] === 'function'
}

function isAsyncIterable<T = unknown>(
  a: Iter<T> | unknown
): a is AsyncIterable<T> {
  return typeof (a as any)?.[Symbol.asyncIterator] === 'function'
}

export { isIterable, isAsyncIterable }
