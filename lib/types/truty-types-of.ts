import type { Falsy } from './falsy'

type TruthyTypesOf<T> = T extends Falsy ? never : T

export type { TruthyTypesOf }
