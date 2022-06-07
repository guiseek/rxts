type Tail<T extends unknown[]> = T extends [any, ...infer U] ? U : []

export type { Tail }
