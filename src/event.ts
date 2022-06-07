export type EventMap = Record<string, any>

// type EventKey<T extends EventMap> = string & keyof T
// type EventReceiver<T> = (params: T) => void
// type EventListener<T> = {
//   [K in keyof T]?: ((p: T[K]) => void)[]
// }

// interface Emitter<T extends EventMap> {
//   on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
//   off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
//   emit<K extends EventKey<T>>(eventName: K, params: T[K]): void
// }

// export class MyEmitter<T extends EventMap> implements Emitter<T> {
//   private emitter = new EventEmitter()
//   on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
//     this.emitter.on(eventName, fn)
//   }

//   off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
//     this.emitter.off(eventName, fn)
//   }

//   emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
//     this.emitter.emit(eventName, params)
//   }
// }

// class MyClass extends MyEmitter<{ foo: string }> {}

// const c = new MyClass()

// c.emit('foo', 'bar')

// // `listeners` are unbounded -- don't use this in practice!
// function eventEmitter<T extends EventMap>(): Emitter<T> {
//   const listeners: Record<keyof T, T[keyof T]> = {}

//   const getListeners = <K extends keyof T>(key: K) => {
//     return listeners[key] ?? []
//   }

//   const addListener = <K extends keyof EventMap>(
//     eventName: K,
//     fn: (p: T[K]) => void
//   ) => {
//     const listeners = getListeners(eventName)
//     listeners.push(fn)
//   }

//   return {
//     on(key, fn) {
//       listeners[key] = getListeners(key).concat(fn as any)
//     },
//     off(key, fn) {
//       const events = listeners[key] ?? []
//       events.filter((f) => f !== fn)
//     },
//     emit(key, data) {
//       const events = listeners[key] ?? []
//       events.forEach((fn) => fn(data))
//     },
//   }
// }

// const emitter = eventEmitter<{
//   data: Buffer | string
//   end: undefined
// }>()

// // OK!
// emitter.on('data', (x) => x)

// // Error! 'string' is not assignable to 'number'
// emitter.on('data', (x) => x)

// // Error! '"foo"' is not assignable to '"data" | "end"'.
// // emitter.on('foo', function () {})

// import { EventEmitter } from 'events'

// export function createEmitter<T extends EventMap>(): Emitter<T> {
//   return new EventEmitter()
// }
