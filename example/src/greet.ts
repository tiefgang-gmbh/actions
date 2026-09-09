// The one piece of logic the template carries: enough for a unit test,
// a failure path, and a functional test against the bundle.
export function greet(name: string): string {
  const trimmed = name.trim()
  if (trimmed === '') throw new Error('name must not be empty')
  return `hello, ${trimmed}`
}
