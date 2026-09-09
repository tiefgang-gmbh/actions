import { describe, expect, it } from 'vitest'
import { greet } from './greet'

describe('greet', () => {
  it('greets the given name', () => {
    expect(greet('tiefgang')).toBe('hello, tiefgang')
  })

  it('trims surrounding whitespace', () => {
    expect(greet('  world ')).toBe('hello, world')
  })

  it('refuses an empty name', () => {
    expect(() => greet('')).toThrow('name must not be empty')
    expect(() => greet('   ')).toThrow('name must not be empty')
  })
})
