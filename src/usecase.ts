export interface Fn<T = any> extends Function {
  (...args: unknown[]): T
}

export interface UseCase<Input = void, Output = void> {
  execute(input: Input): Output
}

// export interface UseCaseScope {
//   in: string
//   use: Fn
//   with: Fn[]
// }

// interface Scope<T = typeof Function> {
//   use: Fn<T>
//   with: Fn[]
// }

// export interface UseLoader<S extends Scope> {
//   [K in keyof S]: S<K>
// }

// export function useCase<S extends UseLoader>(scopes: S) {
//   const map = new Map<keyof S, S[keyof S]>()

//   Object.entries(scopes).forEach(([key, scope]) => {
//     map.set(key, scope)
//   })

//   function use<C extends keyof S>(inCase: C) {
//     const useCase = map.get(inCase)
//     if (!useCase) throw new Error()
//     return useCase.use.bind(useCase.with)
//   }

//   return { use }
// }
