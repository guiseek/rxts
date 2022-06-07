type Fn = (...args: unknown[]) => void

function eventable<EventMap = Record<string, Fn>>() {
  // let events: Map<unknown, Fn[]>

  return <E extends keyof EventMap>(initialEvents: [E, [Fn]][] = []) => {
    const events = new Map<unknown, Fn[]>(initialEvents)

    return {
      add<E extends keyof EventMap>(event: E, fn: Fn) {
        const fns = events.get(event) ?? []
        events.set(event, [...fns, fn])
      },
      remove<E extends keyof EventMap>(event: E) {
        events.delete(event)
      },
      listen<E extends keyof EventMap>(event: E) {
        const fns = events.get(event) ?? []
        return fns.map((fn) => fn())
      },
    }
  }
}

export { eventable }
