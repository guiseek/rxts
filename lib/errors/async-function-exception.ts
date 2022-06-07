class AsyncFunctionException extends Error {
  static MESSAGE = `'Iterable' não pode ser usado com função assíncrona.

  Se você deseja lidar com a função assíncrona, tente com \`toAsync\``

  constructor(message = AsyncFunctionException.MESSAGE) {
    super(message)
  }
}

export { AsyncFunctionException }
