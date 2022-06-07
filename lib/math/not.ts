/**
 * Retorna o `!` de seu argumento.
 * Ele retornará `true` quando passar um valor falso e `false` quando passar um valor verdade.
 *
 * @example
 * ```ts
 * not(true); // false
 * not(1); // false
 * not(NaN); // true
 * ```
 */
function not(a: unknown): boolean {
  return !a
}

export { not }
