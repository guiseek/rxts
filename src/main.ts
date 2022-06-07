import { toAsync } from '../lib/lazy/to-async'
import { last, toArray } from '../lib/misc'
import { head } from '../lib/misc/head'
import { pipe } from '../lib/misc/pipe'
import { map } from '../lib/lazy/map'
import { filter } from '../lib/lazy'
import { each } from '../lib/iter'

each(console.log, [1, 2, 3, 4, 5, 6])
// R: ?

console.log(pipe([1, 2, 3, 4], head))
// R: ?

console.log(last([1, 2, 3, 4, 5, 6]))
// R: ?

console.log(
  pipe(
    [1, 2, 3, 4, 5],
    map((a) => a * 10),
    filter((a) => a % 4 === 0),
    toArray
  )
)
// R: ?

const getById = async (id: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(id * 100)
    }, 1000)
  })
}

console.log(
  await pipe(
    [1, 2],
    toAsync,
    map(getById),
    toArray,
    map((a) => a * 2),
    toArray
  )
)
// R: ?
