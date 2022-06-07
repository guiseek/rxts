
export function inject(scopes: any) {
  const map = new Map<string, any>()

  Object.entries(scopes).forEach(([key, scope]) => {
    map.set(key, scope)
  })

  function use<C extends string>(inCase: C) {
    const useCase = map.get(inCase)
    if (!useCase) throw new Error()
    return useCase.use.bind(useCase.with)
  }

  return { use }
}
