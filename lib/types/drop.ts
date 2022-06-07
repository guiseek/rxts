import type { Prepend } from './prepend'
import type { Length } from './length'
import type { Tail } from './tail'

type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<I, any>>
  1: T
}[Length<I> extends N ? 1 : 0]

export type { Drop }
